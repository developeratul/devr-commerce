import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { openModal } from "../../../redux/actions/editProductModalActions";

// actions
import { addToCart } from "../../../redux/actions/cartActions";

// icons
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// icons
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const Store = ({ TabPanel, value, theme }) => {
  // the user who's data was fetched
  const user = useSelector((state) => state.profileReducer);
  // the user who is visiting this page / the authenticated user
  const authUser = useSelector((state) => state.authReducer);
  const { cart_items } = useSelector((state) => state.cartReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  // for deleting a product
  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      toast.info("Deleting...");

      try {
        const res = await fetch("/get_product/delete_product", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
        });

        const body = await res.json();

        if (res.status === 200) {
          history.push("/");
          toast.dark(body.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // for adding an item into the cart
  function AddToCart(product) {
    // if user is not authenticated he is unable to perform this action
    if (!authUser.isAuthenticated) {
      history.push("/login");
      toast.info("You have to login in order to perform this action");
    } else {
      // * for checking if the product can be shipped in the user's country
      let canBeShipped = true;

      // putting all the countries from the shipping_options in an array
      const temp = [];
      for (let i = 0; i < product.shipping_options.length; i++) {
        temp.push(product.shipping_options[i].countries);
      }
      const shippingCountries = temp.join().split(",");

      canBeShipped = shippingCountries.includes(authUser.user.country);

      // if the product cannot be shipped in the auth users country, he is unable to perform this action
      if (!canBeShipped) {
        toast.error("This product can not be shipped in your country");
      } else {
        dispatch(addToCart(product));
      }
    }
  }

  // ! was getting an error when I was directly calling dispatch so that's why I have
  // ! separated it in another function
  function openModalByDispatching(product) {
    dispatch(openModal(product));
  }

  if (!user.products) return "";

  return (
    <>
      <div className="store_tab tab">
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="store_product_container">
            <div className="some_seller_informations">
              <table border="1px">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Product Category</td>
                    <td>{user.productCategory}</td>
                  </tr>
                  <tr>
                    <td>Total Sales</td>
                    <td>{user.totalSales}</td>
                  </tr>
                  <tr>
                    <td>Total Products</td>
                    <td>{user.products.length}</td>
                  </tr>
                  <tr>
                    <td>Total Followers</td>
                    <td>{user.followers.length}</td>
                  </tr>
                  <tr>
                    <td>Total Followings</td>
                    <td>{user.followings.length}</td>
                  </tr>
                  <tr>
                    <td>Member since</td>
                    <td>{user.memberSince}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {user.isSeller ? (
              user.products.length ? (
                <div className="store_container user_container">
                  {user.products.map((product) => {
                    // checking if the item exists in the cart
                    const productExistsInCart = cart_items.find(
                      (item) => item._id === product._id
                    )
                      ? true
                      : false;

                    return (
                      <div className="single_product" key={product._id}>
                        <div
                          className="product_image"
                          style={{
                            background: `url(${product.images[0].photoUrl})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        ></div>

                        <div className="product_desc">
                          <Link
                            to={`/product/${product._id}`}
                            title={product.title}
                          >
                            <p className="product_title">
                              {product.title.slice(0, 45)}
                              {product.title.length > 45 ? "..." : ""}
                            </p>
                          </Link>
                        </div>

                        <div className="product_options">
                          <div className="product_info">
                            <p>{product.price} $</p>
                          </div>

                          <div className="product_controls">
                            {authUser.user._id === user._id ||
                            authUser.user.site_admin ? (
                              <>
                                <IconButton
                                  onClick={() => deleteProduct(product._id)}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    openModalByDispatching(product)
                                  }
                                >
                                  <EditOutlinedIcon />
                                </IconButton>
                              </>
                            ) : (
                              <>
                                {!productExistsInCart ? (
                                  <IconButton
                                    onClick={() => AddToCart(product)}
                                  >
                                    <ShoppingCartOutlinedIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    disabled
                                    className="added_to_cart_message_button"
                                  >
                                    <CheckIcon />
                                  </IconButton>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no_message">
                  <h2>Not Products</h2>
                </div>
              )
            ) : (
              <div className="no_message">
                <h2>Not a seller</h2>
              </div>
            )}
          </div>
        </TabPanel>
      </div>
    </>
  );
};

export default Store;
