import * as Mui from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useCheckoutDispatchContext, useCheckoutStateContext } from "../../Provider";
import { FieldNames, SelectProps } from "../../types";

const Select = (props: SelectProps) => {
  const { options, label, name, onChange: changeHandler, disabled = false } = props;
  const state = useCheckoutStateContext();
  const { setValue } = useCheckoutDispatchContext();
  const handleChange = (e: SelectChangeEvent<string>) =>
    setValue(e.target.name as FieldNames, e.target.value);
  return (
    <Mui.Grid item xs={12} sm={6}>
      <Mui.FormControl margin="dense" fullWidth required disabled={disabled}>
        <Mui.InputLabel>{label}</Mui.InputLabel>
        <Mui.Select name={name} value={state[name]} onChange={changeHandler ?? handleChange}>
          {options.map((option) => (
            <Mui.MenuItem key={option.value} value={option.value}>
              {option.label}
            </Mui.MenuItem>
          ))}
        </Mui.Select>
      </Mui.FormControl>
    </Mui.Grid>
  );
};

export default Select;
