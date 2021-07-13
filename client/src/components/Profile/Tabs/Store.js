import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { openModal } from "../../../redux/actions/editProductModalActions";

import { IconButton } from "@material-ui/core";

// actions
import { addToCart } from "../../../redux/actions/cartActions";

// icons
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { toast } from "react-toastify";

// icons
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const Store = ({ TabPanel, value, theme, user }) => {
  const authUser = useSelector((state) => state.authReducer);
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

  function AddToCart(product) {
    if (!authUser.isAuthenticated) {
      history.push("/login");
      toast.info("You have to login in order to perform this action");
    }

    dispatch(addToCart(product));
  }

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
                  {user.products.map((product, index) => {
                    return (
                      <div className="single_product" key={index}>
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
                              <IconButton onClick={() => AddToCart(product)}>
                                <ShoppingCartOutlinedIcon />
                              </IconButton>
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
