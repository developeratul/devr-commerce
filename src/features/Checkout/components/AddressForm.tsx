import * as Mui from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { useCheckoutDispatchContext, useCheckoutStateContext } from "../Provider";
import { ButtonProps, FieldNames, FormProps, InputProps, SelectProps } from "../types";

const Input = (props: InputProps) => {
  const { label, name } = props;
  const { setValue } = useCheckoutDispatchContext();
  const state = useCheckoutStateContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.name as FieldNames, e.target.value);
  return (
    <Mui.Grid item xs={12} sm={6}>
      <Mui.TextField
        fullWidth
        required
        name={name}
        label={label}
        value={state[name]}
        onChange={handleChange}
        margin="dense"
      />
    </Mui.Grid>
  );
};

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

const Button = (props: ButtonProps) => {
  const { children, ...restProps } = props;
  return (
    <Mui.Grid item xs={12} sm={6}>
      <Mui.FormControl margin="dense" fullWidth>
        <Mui.Button {...restProps}>{children}</Mui.Button>
      </Mui.FormControl>
    </Mui.Grid>
  );
};

const AddressFormContainer = Mui.styled(Mui.Box)({});
export default function AddressForm(props: FormProps) {
  const { nextStep, prevStep } = props;
  const state = useCheckoutStateContext();
  const { setShippingCountry, setShippingSubDivision } = useCheckoutDispatchContext();
  const handleClick = () => {
    nextStep();
  };
  return (
    <AddressFormContainer>
      <Mui.Grid spacing={3} container>
        <Input label="First Name" name="firstName" />
        <Input label="Last Name" name="lastName" />
        <Input label="Email" name="email" />
        <Input label="Address (1 line)" name="shippingStreet" />
        <Input label="City" name="shippingCity" />
        <Input label="Zip Code" name="shippingPostalZipCode" />
        <Select
          name="shippingCountry"
          label="Select Shipping Country"
          options={Object.entries(state.shippingCountries)
            .map(([code, name]: any[]) => ({ label: name, id: code }))
            .map((item) => ({ label: item.label, value: item.id }))}
          onChange={(e: SelectChangeEvent<string>) => setShippingCountry(e.target.value)}
        />
        <Select
          disabled={state.shippingSubdivisions.isLoading}
          name="shippingStateProvince"
          label="Shipping State/Province"
          options={Object.entries(state.shippingSubdivisions.data)
            .map(([code, name]: any[]) => ({ id: code, label: name }))
            .map((item) => ({ label: item.label, value: item.id }))}
          onChange={(e: SelectChangeEvent<string>) => setShippingSubDivision(e.target.value)}
        />
        <Select
          disabled={state.shippingOptions.isLoading}
          name="shippingOption"
          label="Shipping Option"
          options={state.shippingOptions.data.map((option) => ({
            value: option.id,
            label: `${option.description} - ${option.price.formatted_with_symbol}`,
          }))}
        />
        <Button
          type="submit"
          onClick={handleClick}
          fullWidth
          sx={{ padding: 1.5 }}
          variant="contained"
        >
          Next
        </Button>
      </Mui.Grid>
    </AddressFormContainer>
  );
}
