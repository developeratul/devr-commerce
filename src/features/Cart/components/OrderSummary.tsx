import { Flex } from "@/styles";
import { Block, ShoppingBag } from "@mui/icons-material";
import * as Mui from "@mui/material";
import Link from "next/link";
import { useCartDispatchContext, useCartStateContext } from "../Provider";
import Cart from "../service";

const OrderSummaryContainer = Mui.styled(Mui.Paper)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("lg")]: {
    maxWidth: 400,
    minWidth: 350,
  },
  boxShadow: "none",
  padding: "50px 20px",
}));
export default function OrderSummary() {
  const { cart } = useCartStateContext();
  const { setCart } = useCartDispatchContext();
  const emptyCart = async () => {
    const { cart } = await Cart.empty();
    setCart(cart);
  };
  return (
    <OrderSummaryContainer>
      <Mui.Typography variant="h5" paddingBottom={3}>
        Order Summary
      </Mui.Typography>
      <Mui.Divider sx={{ marginBottom: 5 }} />
      <Flex mb={5} justifyContent={"space-between"} alignItems="center">
        <Mui.Typography>Items {cart?.total_items}</Mui.Typography>
        <Mui.Typography>{cart?.subtotal.formatted_with_symbol}</Mui.Typography>
      </Flex>
      <Flex gap={1} flexDirection="column">
        <Mui.Button
          onClick={() => emptyCart()}
          color="warning"
          startIcon={<Block />}
          fullWidth
          variant="contained"
          disabled={!cart?.line_items.length}
        >
          Empty Cart
        </Mui.Button>
        <Link href="/checkout" passHref>
          <Mui.Button
            disabled={!cart?.line_items.length}
            startIcon={<ShoppingBag />}
            fullWidth
            variant="contained"
          >
            Checkout
          </Mui.Button>
        </Link>
      </Flex>
    </OrderSummaryContainer>
  );
}
