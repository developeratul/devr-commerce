import * as Mui from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { FormEvent } from "react";
import { useCheckoutDispatchContext, useCheckoutStateContext } from "../../Provider";
import { FormProps } from "../../types";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

const AddressFormContainer = Mui.styled(Mui.Box)({});
export default function AddressForm(props: FormProps) {
  const { nextStep } = props;
  const state = useCheckoutStateContext();
  const { setShippingCountry, setShippingSubDivision, validateInputs } =
    useCheckoutDispatchContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValidated = validateInputs();
    isValidated && nextStep();
  };
  return (
    <AddressFormContainer component="form" onSubmit={handleSubmit}>
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
        <Button type="submit" fullWidth sx={{ padding: 1.5 }} variant="contained">
          Next
        </Button>
      </Mui.Grid>
    </AddressFormContainer>
  );
}
