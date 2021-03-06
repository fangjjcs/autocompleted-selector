import * as React from "react";
import "./stepper.css";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Autocomplete } from "@material-ui/lab";
import { CircularProgress, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";

import Dropdowns from "./Dropdowns";
import LineChart from "./LineChart";
import { useHttpClient } from "./http-hook";

const steps = [
  {
    label: "Select campaign settings",
  },
  {
    label: "Create an ad group",
  },
  {
    label: "Create an ad",
  },
];

export default function VStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  // !!!!!!!!!!!!
  const [itemList, setItemList] = React.useState([]);
  // !!!!!!!!!!!!

  const [subject, setSubject] = React.useState("");
  const [selectedsubSubjectItem, setSelected] = React.useState([]);
  const [subjectOption, setSubjectOption] = React.useState(props.subjectOption);
  const [subsubjectlist, setsubsubjectlist] = React.useState(props.data);

  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onChangeHandler = (event, target) => {
    if (target != "") {
      setItemList(
        subjectOption[target].map((item) => {
          return item.name;
        })
      );
    } else {
      setItemList([]);
    }

    // 如果 subject 變了 -> clear all
    setSelected([]);
    setSubject(target);
    //setUpdatedComponent(updated("change subject"));
  };

  // !!!
  // 如果 subject 變了 就更新 dropdown components (1個或2個或3個之類的)
  React.useEffect(() => {
    console.log(subject);
    setUpdatedComponent(updated("use effect, change subject"));
  }, [subject]); //or itemList

  // dropdown 有新增修改刪除
  const changeListHandler = (target, value) => {
    console.log(value);
    const newSelected = selectedsubSubjectItem;
    newSelected[target] = value;
    setSelected(newSelected);
    setUpdatedComponent(updated("change list")); // importent! 顯示 selected chip
  };

  const updated = (tag) => {
    // console.log("updated!", tag, selectedsubSubjectItem);
    // 用 itemList : ["Fab", "Model", "Func"] 去 mapping
    const list = itemList.map((i) => {
      return (
        <Dropdowns
          name={i}
          list={subsubjectlist[i]} // -> 要改一下
          selected={selectedsubSubjectItem[i]}
          onChange={changeListHandler}
        />
      );
    });
    return list;
  };

  var component = updated("initialized");
  const [updatedComponent, setUpdatedComponent] = React.useState(component);


  // /////////////////////////////////////////////////////////////////////
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedData, setLoadedData] = useState();

  const fetchDataHandler = () => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/data/getdata",
          'POST',
          JSON.stringify({
            title: "hihi",
            description: "hello"
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        setLoadedData(responseData);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (err) {
        alert(err.message)
      }
    };
    fetchData();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      fetchDataHandler();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // /////////////////////////////////////////////////////////////////////


  
  const arr = ["A","B","C", "D", "E"];
  var object = {};
  for(let i=0 ; i<arr.length;i++){
    object[arr[i]] = ""
  }

  const selected = [{A: "1", B:"2",D:"3"},{A: "1", B:"3",D:"4"},{A: "1", B:"2",D:"5"}];
  const text = "AAA*"; // text
  const parameter = [];
  for(let i = 0 ; i < selected.length ; i++){
    let newobject = object;
    let keys = Object.keys(selected[0]);
    console.log(keys);
    for(let j=0; j<keys.length;j++){
      newobject[keys[j]] = selected[i][keys[j]];
    }
    newobject['text'] = text; // text
    parameter.push(object);
  }
  console.log(parameter);

  // 處理參數 body
  // 幾條線就幾個objects
  // 取 subject 那一段
  // recipe 綁定 tool
  // raw data 必須加回爸爸們
  

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <div>
                {index === 0 ? (
                  <Box></Box>
                ) : index === 1 ? (
                  <Box>
                    <Autocomplete
                      id="tags-standard"
                      options={["Fab", "Model", "Func"]}
                      getOptionLabel={(option) => option}
                      value={subject}
                      onChange={onChangeHandler}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Multiple values"
                          placeholder="Favorites"
                        />
                      )}
                    />
                    <div className="box">{updatedComponent} </div>
                  </Box>
                ) : index === 2 ? (
                  <Box>
                    <LineChart />
                  </Box>
                ) : null}
              </div>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {isLoading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {activeStep === steps.length && !isLoading && loadedData && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          {loadedData.data.chart.map( (obj, key) => { return(<Typography key={key}>{obj}</Typography>)})}
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
