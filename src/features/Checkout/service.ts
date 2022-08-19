import client from "@/lib/commerce";

const Checkout = {
  async generateToken(cartId: string) {
    return await client.checkout.generateToken(cartId, { type: "cart" });
  },
  async getShippingCountries(checkoutTokenId: string) {
    return (await client.services.localeListShippingCountries(checkoutTokenId)).countries;
  },
  async getSubDivisions(countryCode: string) {
    return await client.services.localeListSubdivisions(countryCode);
  },
  async getShippingOptions(
    checkoutTokenId: string,
    country: string,
    stateProvince: string | undefined = undefined
  ) {
    return await client.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region: stateProvince,
    });
  },
};

export default Checkout;
