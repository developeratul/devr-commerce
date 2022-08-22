import { Flex } from "@/styles";
import * as Mui from "@mui/material";
import Image from "next/image";
import { useCheckoutStateContext } from "../../Provider";

const ReviewContainer = Mui.styled(Mui.Box)({
  width: "100%",
  marginBottom: 30,
  display: "flex",
  flexDirection: "column",
  gap: 20,
});
export default function Review() {
  const { checkoutToken } = useCheckoutStateContext();
  return (
    <ReviewContainer>
      <Mui.Typography variant="h5" gutterBottom color="primary">
        Order Summary
      </Mui.Typography>
      {checkoutToken?.line_items.map((item) => (
        <Flex key={item.id} gap={3} width="100%">
          <Image
            src={item.image?.url as string}
            alt={item.name}
            loading="eager"
            width={70}
            height={70}
            style={{ borderRadius: 2 }}
          />
          <Mui.Box flex={1} width="100%">
            <Mui.Typography gutterBottom noWrap>
              {item.name}
            </Mui.Typography>
            <Mui.Typography variant="body2" color="secondary" gutterBottom>
              {item.price.formatted_with_symbol}
            </Mui.Typography>
            <Mui.Typography variant="caption" color="text.secondary">
              Quantity: {item.quantity}
            </Mui.Typography>
          </Mui.Box>
        </Flex>
      ))}
      <Flex justifyContent="space-between" alignItems="center">
        <Mui.Typography>Total:</Mui.Typography>
        <Mui.Typography color="secondary">
          {checkoutToken?.live.subtotal.formatted_with_symbol}
        </Mui.Typography>
      </Flex>
    </ReviewContainer>
  );
}
