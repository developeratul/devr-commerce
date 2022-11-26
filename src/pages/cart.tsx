import { Head, SectionTitle } from "@/components";
import { CartTable, OrderSummary } from "@/features/Cart";
import { Flex } from "@/styles";
import { Box, styled } from "@mui/material";

const CartContentWrapper = styled(Flex)(({ theme }) => ({
  flex: 1,
}));
const CartItems = styled(Box)({
  flex: 1,
  overflowX: "auto"
});
export default function CartPage() {
  return (
    <CartContentWrapper flexDirection={{ xs: "column", lg: "row" }}>
      <Head title="Shopping Cart" />
      <CartItems padding={{ xs: 2, md: 5 }}>
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
