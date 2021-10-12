import "../styles/Product/product.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import config from "../config";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

// actions
import { getProducts } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

// icons
import StarIcon from "@material-ui/icons/Star";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import DoneIcon from "@material-ui/icons/Done";

// components
import FloatingButton from "../components/Product/FloatingButton";
import CreateProductModal from "../components/Product/CreateProductModal";
import InlineLoader from "../components/InlineLoader";
import SearchBar from "../components/Product/SearchBar";

function Product() {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  const { cart_items } = useSelector((state) => state.cartReducer);
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const createProductModalRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();

  async function getProductData(abortController) {
    try {
      const res = await fetch("/get_product/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
      });
      const body = await res.json();

      if (res.ok) {
        dispatch(getProducts(body.products));
      }
    } catch (err) {}
  }

  // * for adding an item into the cart
  function addItemInCart(product) {
    // if user is not authenticated he is unable to perform this action
    if (!isAuthenticated) {
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

      canBeShipped = shippingCountries.includes(user.country);

      // if the product cannot be shipped in the auth users country, he is unable to perform this action
      if (!canBeShipped) {
        toast.error("This product can not be shipped in your country");
      } else if (product.max_quantity <= 0) {
        toast.error("Out of stock");
      } else if (product.user._id === user._id) {
        toast.error("You cannot add your own products in cart");
      } else {
        dispatch(addToCart(product));
      }
    }
  }

  // fetching the product data if they are not fetched yet
  // if they are already fetched, I will not call the getProductData function
  useEffect(() => {
    const abortController = new AbortController();

    document.title = `${config.applicationName} / Products`;

    getProductData(abortController);

    return () => abortController.abort();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="loader_container">
        <InlineLoader />
      </div>
    );
  }

  function getAverage(ara) {
    let total = 0;
    for (let i = 0; i < ara.length; i++) {
      total += ara[i];
    }
    const average = total / ara.length;
    return ~~average;
  }

  return (
    <div className="product_page">
      <SearchBar />

      <div className="products_wrapper">
        {products.map((product) => {
          // checking if the item exists in the cart
          const productExistsInCart = cart_items.find(
            (item) => item._id === product._id
          )
            ? true
            : false;

          // adding an average review field in the product object
          product.averageRating = getAverage(
            product.reviews
              ? product.reviews.map((review) => review.reviewStar)
              : []
          );

          return (
            <div
              className="single_product"
              style={{
                boxShadow: product.user._id === user._id && "0 0 5px #7976fc",
                border: product.user._id === user._id && "none",
              }}
              key={product._id}
            >
              <div className="product_img">
                <img src={product.images[0].photoUrl} alt={product.title} />
              </div>
              <div className="product_desc">
                <h2 title={product.title}>
                  <Link to={`/product/${product._id}`}>
                    {product.title.slice(0, 30)}
                    {product.title.length > 30 ? "..." : ""}
                  </Link>
                </h2>

                <div className="product_author_details">
                  <p className="author_name">
                    By{" "}
                    <Link to={`/profile/${product.user._id}`}>
                      {product.user.name}
                    </Link>
                  </p>
                  <p className="upload_date">{product.uploadTime}</p>
                </div>

                <div className="product_options">
                  <div className="single_option">
                    <span className="icon_container">
                      <StarIcon />
                    </span>{" "}
                    {product.averageRating}
                  </div>
                  <div className="single_option">
                    <IconButton
                      disabled={productExistsInCart}
                      onClick={() => addItemInCart(product)}
                    >
                      {productExistsInCart ? (
                        <DoneIcon />
                      ) : (
                        <ShoppingCartTwoToneIcon />
                      )}
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* if the user is authenticated and if he is a seller than he is able to click on that button */}
      {isAuthenticated && user.isSeller && (
        <>
          <FloatingButton createProductModalRef={createProductModalRef} />
          <CreateProductModal
            user={user}
            createProductModalRef={createProductModalRef}
          />
        </>
      )}
    </div>
  );
}

export default Product;
