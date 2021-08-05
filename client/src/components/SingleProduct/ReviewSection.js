import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Reviews from "./ReviewSectionComponents/Reviews";
import WriteReview from "./ReviewSectionComponents/WriteReview";

const ReviewSection = () => {
  const [hasReview, setHasReview] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);
  const product = useSelector((state) => state.singleProductReducer);

  // for checking if the user has already written a review
  // cause he is allowed to write only one review for a product
  function checkExistingReview() {
    const reviews = product.reviews;

    if (reviews.length > 0) {
      for (let i = 0; i < reviews.length; i++) {
        const reviewer = reviews[i].reviewer;

        if (reviewer._id === user._id) {
          setHasReview(true);
        } else {
          setHasReview(false);
        }
      }
    } else {
      setHasReview(false);
    }
  }

  useEffect(() => {
    checkExistingReview();
  }, [product.reviews]);

  return (
    <div className="review_section">
      {isAuthenticated && product.user._id !== user._id && !hasReview && (
        <WriteReview />
      )}
      <Reviews />
    </div>
  );
};

export default ReviewSection;
