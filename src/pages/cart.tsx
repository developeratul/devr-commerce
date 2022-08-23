import { Head, SectionTitle } from "@/components";
import { CartTable, OrderSummary } from "@/features/Cart";
import { Flex } from "@/styles";
import { Box, styled } from "@mui/material";

const CartContentWrapper = styled(Flex)(({ theme }) => ({
  flex: 1,
}));
const CartItems = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "50px 30px",
}));
export default function CartPage() {
  return (
    <CartContentWrapper>
      <Head title="Shopping Cart" />
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
