import client from "@/lib/commerce";

const Cart = {
  async add(productId: string) {
    return await client.cart.add(productId);
  },
  async retrieve() {
    return await client.cart.retrieve();
  },
  async update(lineId: string, quantity: number) {
    return await client.cart.update(lineId, { quantity });
  },
  async remove(lineId: string) {
    return await client.cart.remove(lineId);
  },
  async empty() {
    return await client.cart.empty();
  },
};

export default Cart;
