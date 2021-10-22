import * as React from "react";
import './stepper.css';
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

import Dropdowns from "./Dropdowns";

const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VStepper(props) {

    console.log("begining")
  const [activeStep, setActiveStep] = React.useState(0);

  // !!!!!!!!!!!!
  const [itemList, setItemList] = React.useState([]);
  // !!!!!!!!!!!!

  const [subject, setSubject] = React.useState("");
  const [selectedsubSubjectItem, setSelected] = React.useState([]);


  const subjectList = {
      Fab:[
          {name:"Fab"}
        ],
      Model:[
          {name:"Fab"},
          {name:"Model"}
        ],
      Func:[
          {name:"Fab"},
          {name:"Model"},
          {name:"Func"}
      ]
    }

  const refs = React.createRef();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onChangeHandler=(event, target)=>{

    if(target != ""){
        setItemList(subjectList[target].map(list=>{return list.name}))
    }else{
        setItemList([])
    }

    // change subject -> clear
    setSelected([]);
    setSubject(target);
    setUpdatedComponent(updated("change subject"));
  
  }


  // !!!
  // 如果 subject 變了 就更新 dropdown components (1個或2個或3個之類的)
  React.useEffect(()=>{
    setUpdatedComponent(updated("use effect"));
  },[itemList])


  const changeListHandler = (subject,value) => {
    // console.log(value)
    const newSelected = selectedsubSubjectItem;
    newSelected[subject] = value;
    setSelected(newSelected);
    setUpdatedComponent(updated("change list"));
  
  };

  const updated = (tag) => {
    console.log("updated!",tag,selectedsubSubjectItem);
    const list = itemList.map((i) => {
        return (
        <Dropdowns
          name={i}
          list={props.list[i]}
          selected={selectedsubSubjectItem[i]}
          onChange={changeListHandler}
          ref={refs}
        />
      );
    });
    return list;
  };

  var component = updated("initialized");
  const [updatedComponent, setUpdatedComponent] = React.useState(component);

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <div>
                {index === 0 ? (
                  <Box>
                    
                  </Box>
                ) : index === 1 ? (
                    
                  <Box>
                      <Autocomplete
                      
                      id="tags-standard"
                      options={["Fab","Model","Func"]}
                      getOptionLabel={(option) => option}
                      value={subject}
                      onChange={onChangeHandler}
                      ref={React.createRef()}
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
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
