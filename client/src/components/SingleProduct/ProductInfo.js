import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

import { useSelector } from "react-redux";

// icons
import DoneIcon from "@material-ui/icons/Done";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// hooks
import useProductCanBeShipped from "../../hooks/useProductCanBeShipped";
import useGetAverage from "../../hooks/useGetAverage";

// components
import AuthorActions from "./Product_Actions/AuthorActions";
import UserActions from "./Product_Actions/UserActions";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import ReviewSection from "./ReviewSection";

SwiperCore.use([Navigation, Thumbs]);

const ProductInfo = () => {
  const product = useSelector((state) => state.singleProductReducer);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const { canBeShipped, shippingCharge, shippingCountry } =
    useProductCanBeShipped(product);

  const thumbsSwiper = null;

  const averageRatingOfTheProduct = useGetAverage(
    product.reviews ? product.reviews.map((review) => review.reviewStar) : 0
  );
  product.averageRating = averageRatingOfTheProduct;

  return (
    <div className="product_info">
      {/* the image slider at the top */}
      <div className="product_image_slider">
        <Swiper
          style={{
            "--swiper-navigation-color": "#7976fc",
            "--swiper-pagination-color": "#7976fc",
          }}
          className="swiper-container"
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {product.images.map((image, index) => {
            return (
              <SwiperSlide className="swiper-slide" key={index}>
                <img src={image.photoUrl} al={product.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* actions and desc container */}
      <div className="product_actions_and_desc">
        {/* desc */}
        <div className="product_desc">
          <h2>{product.title}</h2>
          <p className="desc">
            <span>Description:</span> {product.desc}
          </p>
          <p className="price">
            Price: <span>{product.price} $</span>
          </p>
        </div>

        {/* actions */}
        <div className="product_actions">
          <div className="some_info_before_action">
            {/* showing up some availability informations */}
            <div className="productAvailability">
              {isAuthenticated && (
                <div>
                  {canBeShipped ? (
                    <p className="available">Available in your country!</p>
                  ) : (
                    <p className="unavailable">Unavailable in your country</p>
                  )}
                </div>
              )}
              {product.max_quantity > 0 ? (
                <div>
                  <span className="available">
                    <DoneIcon />
                  </span>
                  In Stock
                </div>
              ) : (
                <p>
                  <span className="unavailable">
                    <ReportProblemOutlinedIcon />
                  </span>
                  Out of stock
                </p>
              )}
            </div>
            <div className="charges">
              {isAuthenticated && (
                <>
                  <p>
                    Shipping Charge: <span>{shippingCharge} $</span>
                  </p>
                  <p>
                    Shipping country: <span>{shippingCountry}</span>
                  </p>
                </>
              )}
            </div>
            <div className="rating">
              <p>
                Rating:{" "}
                {!product.averageRating ? (
                  <span>N/A</span>
                ) : (
                  <span>{product.averageRating}</span>
                )}{" "}
                <span>
                  <StarBorderIcon />
                </span>
              </p>
            </div>
          </div>

          {/* the author and user wil have different options */}
          <div className="actions_wrapper">
            {user._id === product.user._id ? (
              // options for the author
              <AuthorActions />
            ) : (
              // options for the buyers
              <UserActions />
            )}
          </div>
        </div>
      </div>

      {/* the review section */}
      <ReviewSection />
    </div>
  );
};

export default ProductInfo;
