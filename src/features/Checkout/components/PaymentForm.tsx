import { useTheme } from "@/providers/Theme";
import { Flex } from "@/styles";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import Button from "@mui/lab/LoadingButton";
import { Alert, AlertTitle, Box, styled } from "@mui/material";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements, StripeElementStyle } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useCheckoutStateContext } from "../Provider";
import Checkout from "../service";
import { FormProps } from "../types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY);

const CardElementContainer = styled(Box)({
  marginBottom: 30,
});
const ButtonsContainer = styled(Flex)({
  justifyContent: "space-between",
  alignItems: "center",
});
export default function PaymentForm(props: FormProps) {
  const { nextStep, prevStep } = props;
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const state = useCheckoutStateContext();
  const theme = useTheme();

  const handleSubmit = async (
    event: FormEvent,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    try {
      event.preventDefault();
      setIsProcessing(true);
      setCheckoutError("");
      if (!stripe || !elements) throw new Error("Invalid stripe api key");

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("");

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) throw new Error(error.message);

      const orderData: CheckoutCapture = {
        line_items: state.checkoutToken?.live.line_items,
        customer: { firstname: state.firstName, lastname: state.lastName, email: state.email },
        shipping: {
          name: "International",
          street: state.shippingStreet,
          town_city: state.shippingCity,
          county_state: state.shippingStateProvince,
          postal_zip_code: state.shippingPostalZipCode,
          country: state.shippingCountry,
        },
        fulfillment: { shipping_method: state.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: { payment_method_id: paymentMethod.id },
        },
      };

      await Checkout.captureCheckout(state.checkoutToken?.id as string, orderData);
      nextStep();
    } catch (err: any) {
      setCheckoutError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementStyles: StripeElementStyle = {
    base: {
      backgroundColor: "transparent",
      color: theme.palette.text.primary,
    },
  };
  const submitButtonText = isProcessing
    ? "Processing..."
    : `Pay ${state.checkoutToken?.live.subtotal.formatted_with_symbol}`;

  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElementContainer>
              <CardElement onReady={(e) => e.focus()} options={{ style: cardElementStyles }} />
            </CardElementContainer>
            <ButtonsContainer>
              <Button disabled={isProcessing} variant="outlined" onClick={prevStep}>
                Back
              </Button>
              <Button
                loading={isProcessing}
                type="submit"
                variant="contained"
                disabled={!stripe}
                color="primary"
              >
                {submitButtonText}
              </Button>
            </ButtonsContainer>
          </form>
        )}
      </ElementsConsumer>
      {checkoutError && (
        <Alert sx={{ marginTop: 3 }} severity="error">
          <AlertTitle>Checkout Error</AlertTitle>
          {checkoutError}
        </Alert>
      )}
    </Elements>
  );
}
