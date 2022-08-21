import { AppProps } from "@/types";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { ShippingMethod } from "@chec/commerce.js/types/shipping-method";
import * as Mui from "@mui/material";
import React from "react";

type Error = {
  field: string;
  message: string;
};

export type InitialState = {
  isLoading: boolean;
  checkoutToken: CheckoutToken | null;
  firstName: string;
  lastName: string;
  email: string;
  shippingStreet: string;
  shippingCity: string;
  shippingStateProvince: string;
  shippingPostalZipCode: string;
  shippingCountry: string;
  shippingCountries: {};
  shippingSubdivisions: { isLoading: boolean; data: {} };
  shippingOptions: { isLoading: boolean; data: ShippingMethod[] };
  shippingOption: string;
  order: CheckoutCaptureResponse | null;
  errors: Error[];
};

export type FieldNames =
  | "firstName"
  | "lastName"
  | "email"
  | "shippingStreet"
  | "shippingCity"
  | "shippingStateProvince"
  | "shippingPostalZipCode"
  | "shippingCountry"
  | "shippingOption"
  | "order";

export type Action =
  | { type: "SET_VALUE"; payload: { name: FieldNames; value: string } }
  | { type: "SET_TOKEN_AND_SHIPPING_COUNTRIES"; payload: { token: CheckoutToken; countries: {} } }
  | { type: "SET_LOADING_STATE"; payload: { name: "shippingSubdivisions" | "shippingOptions" } }
  | { type: "LOAD_SUB_DIVISIONS"; payload: { data: {} } }
  | { type: "LOAD_SHIPPING_OPTIONS"; payload: { data: [] } }
  | { type: "THROW_ERROR"; payload: Error }
  | { type: "REMOVE_ERROR"; payload: { field: string } }
  | { type: "SET_ORDER"; payload: CheckoutCaptureResponse };

export type Reducer = React.Reducer<InitialState, Action>;
export type Rule = {
  field: FieldNames;
  condition: boolean;
  errorMessage: string;
};
export type DispatchState = {
  setTokenAndShippingCountries: (token: CheckoutToken, countries: {}) => void;
  setValue: (name: FieldNames, value: string) => void;
  setShippingCountry: (countryCode: string) => void;
  setShippingSubDivision: (stateProvince: string) => void;
  validateInputs: () => boolean;
  setOrder: (order: CheckoutCaptureResponse) => void;
};

export type InputProps = {
  name: FieldNames;
  label: string;
};

export type SelectProps = {
  label: string;
  options: { label: string; value: any }[];
  name: "shippingCountry" | "shippingOption" | "shippingStateProvince";
  disabled?: boolean;
  onChange?: (e: Mui.SelectChangeEvent<string>) => void;
};

export type ButtonProps = AppProps | Mui.ButtonProps;

export type FormProps = { nextStep: () => void; prevStep: () => void };
