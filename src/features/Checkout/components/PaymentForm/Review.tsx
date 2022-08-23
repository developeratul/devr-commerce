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
const ImageContainer = Mui.styled(Mui.Box)({
  width: 75,
  height: 75,
  overflow: "hidden",
  borderRadius: 2,
  alignSelf: "flex-start",
});
const SingleReview = Mui.styled(Flex)(({ theme }) => ({}));
export default function Review() {
  const { checkoutToken } = useCheckoutStateContext();
  console.log(checkoutToken?.line_items);
  return (
    <ReviewContainer>
      <Mui.Typography variant="h5" gutterBottom color="primary">
        Order Summary
      </Mui.Typography>
      {checkoutToken?.line_items.map((item: any) => (
        <SingleReview key={item.id} gap={2}>
          <ImageContainer>
            <Image
              src={item.image?.url}
              alt={item.name}
              loading="eager"
              width="100%"
              height="100%"
            />
          </ImageContainer>
          <Mui.Box flex={1}>
            <Mui.Typography gutterBottom>{item.name}</Mui.Typography>
            <Mui.Typography variant="body2" color="secondary" gutterBottom>
              {item.price.formatted_with_symbol}
            </Mui.Typography>
            <Mui.Typography variant="caption" color="text.secondary">
              Quantity: {item.quantity}
            </Mui.Typography>
          </Mui.Box>
        </SingleReview>
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
