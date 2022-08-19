import { useCartStateContext } from "@/features/Cart";
import { AppProps } from "@/types";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import Checkout from "./service";
import { InitialState, Reducer } from "./types";

const initialState: InitialState = {
  isLoading: true,
  checkoutToken: null,
  firstName: "",
  lastName: "",
  email: "",
  shippingName: "",
  shippingStreet: "",
  shippingCity: "",
  shippingStateProvince: "",
  shippingPostalZipCode: "",
  shippingCountry: "",
  cardNum: "",
  expMonth: "",
  expYear: "",
  ccv: "",
  billingPostalZipcode: "",
  shippingCountries: {},
  shippingSubdivisions: { isLoading: true, data: {} },
  shippingOptions: { isLoading: true, data: [] },
  shippingOption: "",
};

const CheckoutStateContext = React.createContext<InitialState>(initialState);
const CheckoutReducerContext = React.createContext(null);

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      return { ...state, [action.payload.name]: action.payload.value };
    }
    case "SET_TOKEN_AND_SHIPPING_COUNTRIES": {
      return {
        ...state,
        checkoutToken: action.payload.token,
        shippingCountries: action.payload.countries,
        isLoading: false,
      };
    }
  }
};

export function CheckoutProvider(props: AppProps) {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { cart } = useCartStateContext();
  const router = useRouter();

  const setTokenAndShippingCountries = (token: CheckoutToken, countries: {}) =>
    dispatch({ type: "SET_TOKEN_AND_SHIPPING_COUNTRIES", payload: { token, countries } });

  const generateCheckoutToken = React.useCallback(async () => {
    try {
      if (cart?.line_items.length) {
        const token = await Checkout.generateToken(cart.id);
        const countries = await Checkout.getShippingCountries(token.id);
        setTokenAndShippingCountries(token, countries);
      } else {
        router.replace("/cart");
        toast.error("Your cart is empty");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [cart, router]);

  React.useEffect(() => {
    generateCheckoutToken();
  }, [generateCheckoutToken]);

  return <CheckoutStateContext.Provider value={state}>{children}</CheckoutStateContext.Provider>;
}
export const useCheckoutStateContext = () => React.useContext(CheckoutStateContext);
