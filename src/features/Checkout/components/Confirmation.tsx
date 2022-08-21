import { useCartDispatchContext } from "@/features/Cart";
import * as Mui from "@mui/material";
import { useRouter } from "next/router";
import { useCheckoutStateContext } from "../Provider";

const ConfirmationContainer = Mui.styled(Mui.Box)({});
export default function Confirmation() {
  const { order } = useCheckoutStateContext();
  const { setCart } = useCartDispatchContext();
  const router = useRouter();
  const handleClick = () => {
    setCart(null);
    router.push("/cart");
  };
  return (
    <ConfirmationContainer>
      <Mui.Typography variant="h6">
        Thank you for purchase, {order?.customer.firstname}!
      </Mui.Typography>
      <Mui.Divider sx={{ marginY: 3 }} />
      <Mui.Typography mb={3}>Order ref: {order?.customer_reference}</Mui.Typography>
      <Mui.Button onClick={handleClick} variant="outlined">
        Back to cart
      </Mui.Button>
    </ConfirmationContainer>
  );
}
