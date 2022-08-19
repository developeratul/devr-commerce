import { CheckoutForm, CheckoutProvider } from "@/features/Checkout";
import { Flex } from "@/styles";
import { styled } from "@mui/material";

const CheckoutContainer = styled(Flex)({
  flex: 1,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  padding: "50px 0",
});
export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContainer>
        <CheckoutForm />
      </CheckoutContainer>
    </CheckoutProvider>
  );
}
