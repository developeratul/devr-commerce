import "../styles/Cart/Cart.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import NotFound from "./NotFound";
import EmptyCart from "../components/Cart/EmptyCart";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import { changeQuantity, removeItem } from "../redux/actions/cartActions";

const Cart = () => {
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const cart_items = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  function putOptions(item) {
    let options = [];

    for (let i = 1; i < Math.max(item.quantity, item.max_quantity + 1); i++) {
      options.push(
        <option key={i} value={i}>
          Quantity: {i}
        </option>
      );
    }

    return options;
  }

  function removeThisItem(item) {
    dispatch(removeItem(item));
  }

  useEffect(() => {
    document.title = `${config.applicationName} / Cart`;
  }, []);

  return (
    <div className="cart_page">
      <div className="container">
        {isAuthenticated ? (
          <>
            {cart_items.length > 0 ? (
              <div className="cart_content">
                <h2 className="heading">Cart Items:</h2>

                <div className="cart_item_container">
                  {cart_items.map((item, index) => {
                    return (
                      <div className="singleItem" key={index}>
                        <div className="item_img">
                          <img src={item.images[0].photoUrl} alt={item.title} />
                        </div>
                        <div className="item_desc">
                          <div className="item_name_and_price">
                            <h2 className="product_title">
                              <Link to={`/product/${item._id}`}>
                                {item.title}
                              </Link>
                            </h2>
                            <p className="price">{item.total_price} $</p>
                          </div>

                          <div className="item_actions">
                            <div className="item_quantity">
                              <select
                                value={item.quantity}
                                onChange={(event) =>
                                  dispatch(
                                    changeQuantity(
                                      item,
                                      parseInt(event.target.value)
                                    )
                                  )
                                }
                              >
                                {putOptions(item)}
                              </select>
                            </div>

                            <div className="remove_item">
                              <Button
                                variant="contained"
                                onClick={() => removeThisItem(item)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <EmptyCart />
            )}
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default Cart;
