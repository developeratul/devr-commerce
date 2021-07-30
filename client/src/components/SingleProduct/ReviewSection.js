import { useSelector } from "react-redux";
import Reviews from "./ReviewSectionComponents/Reviews";
import WriteReview from "./ReviewSectionComponents/WriteReview";

const ReviewSection = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  const product = useSelector((state) => state.singleProductReducer);

  return (
    <div className="review_section">
      {isAuthenticated && product.user._id !== user._id && <WriteReview />}
      <Reviews />
    </div>
  );
};

export default ReviewSection;
