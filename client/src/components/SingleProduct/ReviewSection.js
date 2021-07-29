import { useSelector } from "react-redux";
import Reviews from "./ReviewSectionComponents/Reviews";
import WriteReview from "./ReviewSectionComponents/WriteReview";

const ReviewSection = ({ product }) => {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  return (
    <div className="review_section">
      {isAuthenticated && product.user._id !== user._id && (
        <WriteReview product={product} />
      )}
      <Reviews product={product} />
    </div>
  );
};

export default ReviewSection;
