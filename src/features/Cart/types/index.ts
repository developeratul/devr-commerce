import { AppProps } from "@/types";
import { Cart } from "@chec/commerce.js/types/cart";
import React from "react";

export type InitialState = { cart: Cart | null; isLoading: boolean };
export type DispatchState = { setCart: (payload: Cart | null) => void };
export type Action = { type: "SET_CART"; payload: Cart | null };
export type Reducer = React.Reducer<InitialState, Action>;
export type CartProviderProps = AppProps;
