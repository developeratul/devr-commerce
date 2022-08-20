import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { Button } from "@mui/material";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useCheckoutStateContext } from "../Provider";
import Checkout from "../service";
import { FormProps } from "../types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY);
export default function PaymentForm(props: FormProps) {
  const { nextStep, prevStep } = props;
  const state = useCheckoutStateContext();

  const handleSubmit = async (
    event: FormEvent,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message as string);
    } else {
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
    }
  };
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={prevStep}>
                Back
              </Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {state.checkoutToken?.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
      </ElementsConsumer>
    </Elements>
  );
}
