import { useCartDispatchContext, useCartStateContext } from "@/providers/Cart";
import Cart from "@/services/cart";
import { Flex } from "@/styles";
import { Block, ShoppingBag } from "@mui/icons-material";
import { Button, Divider, Paper, styled, Typography } from "@mui/material";

const OrderSummaryContainer = styled(Paper)(({ theme }) => ({
  flex: 1,
  width: "100%",
  maxWidth: 350,
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
      <Typography variant="h5" paddingBottom={3}>
        Order Summary
      </Typography>
      <Divider sx={{ marginBottom: 5 }} />
      <Flex mb={5} justifyContent={"space-between"} alignItems="center">
        <Typography>Items {cart?.total_items}</Typography>
        <Typography>{cart?.subtotal.formatted_with_symbol}</Typography>
      </Flex>
      <Flex gap={1} flexDirection="column">
        <Button
          onClick={() => emptyCart()}
          color="warning"
          startIcon={<Block />}
          fullWidth
          variant="contained"
        >
          Empty Cart
        </Button>
        <Button startIcon={<ShoppingBag />} fullWidth variant="contained">
          Checkout
        </Button>
      </Flex>
    </OrderSummaryContainer>
  );
}
