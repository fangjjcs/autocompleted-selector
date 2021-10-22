import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

export default function Dropdowns(props) {
  
    const [selected, setselected] = useState(props.selected);

    useEffect(()=>{
        setselected(props.selected)
    }, [props.selected])


    const onChangeHandler =(event, value)=>{
        console.log(value)
        props.onChange(props.name, value);
    }
  
    return (
    <Autocomplete
      multiple
      style={{minWidth: 150, margin: 8}}
      id="tags-standard"
      options={props.list}
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
