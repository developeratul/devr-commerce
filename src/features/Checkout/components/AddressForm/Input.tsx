import * as Mui from "@mui/material";
import { ChangeEvent } from "react";
import { useCheckoutDispatchContext, useCheckoutStateContext } from "../../Provider";
import { FieldNames, InputProps } from "../../types";

const Input = (props: InputProps) => {
  const { label, name } = props;
  const { setValue } = useCheckoutDispatchContext();
  const state = useCheckoutStateContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.name as FieldNames, e.target.value);
  const isError = !!state.errors.find((error) => error.field === name);
  const error = state.errors.find((error) => error.field === name);
  return (
    <Mui.Grid item xs={12} sm={6}>
      <Mui.FormControl variant="outlined" fullWidth required error={isError} margin="dense">
        <Mui.TextField
          label={label}
          required
          error={isError}
          name={name}
          value={state[name]}
          onChange={handleChange}
        />
        <Mui.FormHelperText>{error?.message}</Mui.FormHelperText>
      </Mui.FormControl>
    </Mui.Grid>
  );
};

export default Input;
