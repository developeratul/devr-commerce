import client from "@/lib/commerce";

const Cart = {
  async add(productId: string) {
    return await client.cart.add(productId);
  },
  async retrieve() {
    return await client.cart.retrieve();
  },
};

export default Cart;
