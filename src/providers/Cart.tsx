import { Loader } from "@/components";
import CartService from "@/services/cart";
import { AppProps } from "@/types";
import { Cart } from "@chec/commerce.js/types/cart";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type InitialState = {
  cart: Cart | null;
};
type CartProviderProps = AppProps;

const CartContext = createContext<InitialState>({ cart: null });
export default function CartProvider(props: CartProviderProps) {
  const { children } = props;
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const retrieveCart = useCallback(() => {
    CartService.retrieve()
      .then((cart) => setCart(cart))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    retrieveCart();
  }, [retrieveCart]);
  if (loading) return <Loader />;
  return <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>;
}
export function useCartContext() {
  return useContext(CartContext);
}
