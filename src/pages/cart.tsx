import { SectionTitle } from "@/components";
import { CartTable, OrderSummary, useCartStateContext } from "@/features/Cart";
import { Box, styled } from "@mui/material";

const CartContentWrapper = styled(Box)({
  flex: 1,
  width: "100%",
  display: "flex",
});
const CartItems = styled(Box)({
  flex: 1,
  padding: "50px 30px",
});
export default function CartPage() {
  const { cart } = useCartStateContext();
  return (
    <CartContentWrapper>
      <CartItems>
        <SectionTitle
          title="Shopping Cart"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <CartTable />
      </CartItems>
      <OrderSummary />
    </CartContentWrapper>
  );
}
