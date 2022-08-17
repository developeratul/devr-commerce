import { CartTable, SectionTitle } from "@/components";
import { useCartStateContext } from "@/providers/Cart";
import { Box, styled } from "@mui/material";

const CartContentWrapper = styled(Box)({
  padding: "50px 20px",
});
export default function CartPage() {
  const { cart } = useCartStateContext();
  return (
    <CartContentWrapper>
      <SectionTitle
        title="Shopping Cart"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <CartTable />
    </CartContentWrapper>
  );
}
