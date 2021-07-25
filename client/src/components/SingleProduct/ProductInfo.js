import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

import { useSelector } from "react-redux";

// components
import AuthorActions from "./Product_Actions/AuthorActions";
import UserActions from "./Product_Actions/UserActions";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";

SwiperCore.use([Navigation, Thumbs]);

const ProductInfo = ({ product }) => {
  const { user } = useSelector((state) => state.authReducer);

  const thumbsSwiper = null;

  return (
    <div className="product_info">
      <div className="product_image_slider">
        <Swiper
          style={{
            "--swiper-navigation-color": "#7976fc",
            "--swiper-pagination-color": "#7976fc",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay
        >
          {product.images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={image.photoUrl} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="product_actions_and_desc">
        <div className="product_desc">
          <h2>{product.title}</h2>
          <p className="desc">
            <span>Description:</span> {product.desc}
          </p>
          <p className="price">
            Price: <span>{product.price} $</span>
          </p>
        </div>

        <div className="product_actions">
          {user._id === product.user._id ? (
            // options for the author
            <AuthorActions product={product} />
          ) : (
            // options for the buyers
            <UserActions product={product} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
