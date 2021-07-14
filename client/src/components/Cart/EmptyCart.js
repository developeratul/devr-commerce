import emptyCartImg from "../../assets/img/emptyCart.png";

const EmptyCart = () => {
  return (
    <div className="Empty_cart">
      <div className="empty_cart_illustration">
        <img src={emptyCartImg} alt="Your cart is empty" />
      </div>

      <div className="empty_cart_desc">
        <h2>Cart is Empty</h2>
        <p>Looks like you don't have any items in your cart go and add some.</p>
      </div>
    </div>
  );
};

export default EmptyCart;
