import { useCartStateContext } from "@/features/Cart";
import { AppProps } from "@/types";
import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import validator from "validator";
import Checkout from "./service";
import { DispatchState, FieldNames, InitialState, Reducer, Rule } from "./types";

const initialState: InitialState = {
  isLoading: true,
  checkoutToken: null,
  firstName: "",
  lastName: "",
  email: "",
  shippingStreet: "",
  shippingCity: "",
  shippingStateProvince: "",
  shippingPostalZipCode: "",
  shippingCountry: "",
  shippingCountries: {},
  shippingSubdivisions: { isLoading: true, data: {} },
  shippingOptions: { isLoading: true, data: [] },
  shippingOption: "",
  order: null,
  errors: [],
};

const CheckoutStateContext = React.createContext<InitialState>(initialState);
const CheckoutDispatchContext = React.createContext<DispatchState>({
  setTokenAndShippingCountries: () => null,
  setValue: () => null,
  setShippingCountry: () => null,
  setShippingSubDivision: () => null,
  validateInputs: () => false,
  setOrder: () => null,
});

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
    case "SET_LOADING_STATE": {
      return {
        ...state,
        [action.payload.name]: { ...state[action.payload.name], isLoading: true },
      };
    }
    case "LOAD_SUB_DIVISIONS": {
      return { ...state, shippingSubdivisions: { data: action.payload.data, isLoading: false } };
    }
    case "LOAD_SHIPPING_OPTIONS": {
      return { ...state, shippingOptions: { data: action.payload.data, isLoading: false } };
    }
    case "THROW_ERROR": {
      const doesErrorExist = state.errors.find((error) => error.field === action.payload.field);
      if (!doesErrorExist) {
        return { ...state, errors: [...state.errors, action.payload] };
      } else return state;
    }
    case "REMOVE_ERROR": {
      console.log("call in remove error");
      const errors = state.errors.filter((error) => error.field !== action.payload.field);
      return { ...state, errors };
    }
    case "SET_ORDER": {
      return { ...state, order: action.payload };
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

  const setValue = (name: FieldNames, value: string) =>
    dispatch({ type: "SET_VALUE", payload: { name, value } });

  const setLoadingState = (name: "shippingSubdivisions" | "shippingOptions") =>
    dispatch({ type: "SET_LOADING_STATE", payload: { name } });

  const setSubDivisions = (data: {}) => dispatch({ type: "LOAD_SUB_DIVISIONS", payload: { data } });
  const setShippingOptions = (data: []) =>
    dispatch({ type: "LOAD_SHIPPING_OPTIONS", payload: { data } });

  const setOrder = (order: CheckoutCaptureResponse) =>
    dispatch({ type: "SET_ORDER", payload: order });

  const setShippingCountry = async (countryCode: string) => {
    setValue("shippingCountry", countryCode);
    setValue("shippingStateProvince", "");
    setValue("shippingOption", "");
    setShippingOptions([]);
    setLoadingState("shippingSubdivisions");
    setLoadingState("shippingOptions");
    const subDivisions = await Checkout.getSubDivisions(countryCode);
    setSubDivisions(subDivisions);
  };

  const setShippingSubDivision = async (stateProvince: string) => {
    setValue("shippingStateProvince", stateProvince);
    setValue("shippingOption", "");
    setLoadingState("shippingOptions");
    const shippingOptions = await Checkout.getShippingOptions(
      state.checkoutToken?.id as string,
      state.shippingCountry,
      stateProvince
    );
    setShippingOptions(shippingOptions);
  };

  const throwError = (field: string, message: string) =>
    dispatch({ type: "THROW_ERROR", payload: { field, message } });
  const removeError = (field: FieldNames) => dispatch({ type: "REMOVE_ERROR", payload: { field } });

  const validateInputs = () => {
    let isValidated = true;

    const rules: Rule[] = [
      {
        field: "email",
        condition: validator.isEmail(state.email),
        errorMessage: "Please enter a valid email",
      },
    ];

    rules.map((rule) => {
      if (!rule.condition) {
        isValidated = false;
        throwError(rule.field, rule.errorMessage);
      } else {
        removeError("email");
      }
    });

    return isValidated;
  };

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

  return (
    <CheckoutDispatchContext.Provider
      value={{
        setTokenAndShippingCountries,
        setValue,
        setShippingCountry,
        setShippingSubDivision,
        validateInputs,
        setOrder,
      }}
    >
      <CheckoutStateContext.Provider value={state}>{children}</CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
}
export const useCheckoutStateContext = () => React.useContext(CheckoutStateContext);
export const useCheckoutDispatchContext = () => React.useContext(CheckoutDispatchContext);
