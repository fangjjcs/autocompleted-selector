import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

export default function Dropdowns(props) {
  
    const [selected, setselected] = useState(props.selected);
    const [isAll, setAll] = useState(false);

    useEffect(()=>{
        setselected(props.selected)
    }, [props.selected])

    const options = [{ title: "all", group: null , id: "all"}, ...props.list]

    const onChangeHandler =(event, value)=>{
        // console.log(value)
        if(value.length>0 && value.findIndex(obj=>obj.id === 'all') > -1 ){
            props.onChange(props.name, props.list);
            setAll(true)
        }else{
            props.onChange(props.name, value);
            setAll(false);
        }
        
    }
  
    return (
    <Autocomplete
      multiple
      style={{minWidth: 150, margin: 8}}
      id="tags-standard"
      options={options}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.title}
      //key={props.selected} //   when key value changed, component will re-render
      value={props.selected?props.selected:[]}
      defaultValue={props.selected?props.selected:[]}
      onChange={onChangeHandler}
      getOptionSelected={(option, value)=>{
          return option.title === value.title
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Multiple values"
          placeholder="Favorites"
        />
      )}
    />
  );
}
