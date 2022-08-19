import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import React from "react";

export type InitialState = {
  isLoading: boolean;
  checkoutToken: CheckoutToken | null;
  firstName: string;
  lastName: string;
  email: string;
  shippingName: string;
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
  shippingOptions: { isLoading: boolean; data: [] };
  shippingOption: string;
};

export type Action =
  | { type: "SET_VALUE"; payload: { name: string; value: string } }
  | { type: "SET_TOKEN_AND_SHIPPING_COUNTRIES"; payload: { token: CheckoutToken; countries: {} } };

export type Reducer = React.Reducer<InitialState, Action>;
