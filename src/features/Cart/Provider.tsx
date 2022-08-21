import { Loader } from "@/components";
import { Cart } from "@chec/commerce.js/types/cart";
import React from "react";
import toast from "react-hot-toast";
import CartService from "./service";
import { CartProviderProps, DispatchState, InitialState, Reducer } from "./types";

const initialState: InitialState = { cart: null, isLoading: true };
const dispatchState: DispatchState = { setCart: () => null };

const CartStateContext = React.createContext<InitialState>(initialState);
const CartDispatchContext = React.createContext<DispatchState>(dispatchState);

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cart: action.payload, isLoading: false };
    }
    default: {
      throw new Error(`Unknown cart method ${action.type}`);
    }
  }
};

export function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setCart = (payload: Cart | null) => dispatch({ type: "SET_CART", payload });

  const getCart = React.useCallback(async () => {
    try {
      const cart = await CartService.retrieve();
      setCart(cart);
    } catch (err: any) {
      toast.error(err.message);
    }
  }, []);

  React.useEffect(() => {
    getCart();
  }, [getCart]);

  if (state.isLoading) return <Loader />;

  return (
    <CartDispatchContext.Provider value={{ setCart }}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}
export const useCartStateContext = () => React.useContext(CartStateContext);
export const useCartDispatchContext = () => React.useContext(CartDispatchContext);
