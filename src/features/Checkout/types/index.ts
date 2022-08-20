import { AppProps } from "@/types";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { ShippingMethod } from "@chec/commerce.js/types/shipping-method";
import * as Mui from "@mui/material";
import React from "react";

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
  cardNum: string;
  expMonth: string;
  expYear: string;
  ccv: string;
  billingPostalZipcode: string;
  shippingCountries: {};
  shippingSubdivisions: { isLoading: boolean; data: {} };
  shippingOptions: { isLoading: boolean; data: ShippingMethod[] };
  shippingOption: string;
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
  | "shippingOption";

export type Action =
  | { type: "SET_VALUE"; payload: { name: FieldNames; value: string } }
  | { type: "SET_TOKEN_AND_SHIPPING_COUNTRIES"; payload: { token: CheckoutToken; countries: {} } }
  | { type: "SET_LOADING_STATE"; payload: { name: "shippingSubdivisions" | "shippingOptions" } }
  | { type: "LOAD_SUB_DIVISIONS"; payload: { data: {} } }
  | { type: "LOAD_SHIPPING_OPTIONS"; payload: { data: [] } };

export type Reducer = React.Reducer<InitialState, Action>;
export type DispatchState = {
  setTokenAndShippingCountries: (token: CheckoutToken, countries: {}) => void;
  setValue: (name: FieldNames, value: string) => void;
  setShippingCountry: (countryCode: string) => void;
  setShippingSubDivision: (stateProvince: string) => void;
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
