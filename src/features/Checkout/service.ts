import client from "@/lib/commerce";
import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";

const Checkout = {
  async generateToken(cartId: string) {
    return await client.checkout.generateToken(cartId, { type: "cart" });
  },
  async getShippingCountries(checkoutTokenId: string) {
    return (await client.services.localeListShippingCountries(checkoutTokenId)).countries;
  },
  async getSubDivisions(countryCode: string) {
    return (await client.services.localeListSubdivisions(countryCode)).subdivisions;
  },
  async getShippingOptions(
    checkoutTokenId: string,
    country: string,
    stateProvince: string | undefined = undefined
  ) {
    return (await client.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region: stateProvince,
    })) as [];
  },
  async captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture) {
    return await client.checkout.capture(checkoutTokenId, newOrder);
  },
};

export default Checkout;
