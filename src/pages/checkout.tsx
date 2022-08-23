import { Head } from "@/components";
import { CheckoutForm, CheckoutProvider } from "@/features/Checkout";
import { Flex } from "@/styles";
import { styled } from "@mui/material";

const CheckoutContainer = styled(Flex)(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: "50px 0",
}));
export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <Head title="Checkout" />
      <CheckoutContainer>
        <CheckoutForm />
      </CheckoutContainer>
    </CheckoutProvider>
  );
}
