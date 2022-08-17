import { Loader } from "@/components";
import CartService from "@/services/cart";
import { AppProps } from "@/types";
import { Cart } from "@chec/commerce.js/types/cart";
import { createContext, Reducer, useCallback, useContext, useEffect, useReducer } from "react";

type InitialState = { cart: Cart | null; isLoading: boolean };
type DispatchState = { setCart: (payload: Cart) => void };

const initialState: InitialState = { cart: null, isLoading: true };
const dispatchState: DispatchState = { setCart: () => null };

const CartStateContext = createContext<InitialState>(initialState);
const CartDispatchContext = createContext<DispatchState>(dispatchState);

type Action = { type: string; payload: Cart };
const reducer: Reducer<InitialState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cart: action.payload, isLoading: false };
    }
    default: {
      throw new Error(`Unknown cart method ${action.type}`);
    }
  }
};

type CartProviderProps = AppProps;
export default function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCart = (payload: Cart) => dispatch({ type: "SET_CART", payload });

  const getCart = useCallback(async () => {
    try {
      const cart = await CartService.retrieve();
      setCart(cart);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (state.isLoading) return <Loader />;
  return (
    <CartDispatchContext.Provider value={{ setCart }}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}
export const useCartStateContext = () => useContext(CartStateContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);
