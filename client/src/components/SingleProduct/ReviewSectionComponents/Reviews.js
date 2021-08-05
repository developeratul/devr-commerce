import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductData } from "../../../redux/actions/singleProductActions";

// icons
import StarIcon from "@material-ui/icons/Star";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

// this component is containing all the reviews of the product
const Reviews = () => {
  const product = useSelector((state) => state.singleProductReducer);
  const { user } = useSelector((state) => state.authReducer);
  const reviews = product.reviews;
  const dispatch = useDispatch();

  // for deleting a review
  async function deleteReview(reviewId) {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?"
      );

      if (confirmed) {
        const res = await fetch("/get_review/delete_review", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewId, productId: product._id }),
        });

        const body = await res.json();

        console.log(body.product);

        if (res.status === 200) {
          dispatch(getProductData(body.product));
          toast.dark(body.message);
        }
      }
    } catch (err) {}
  }

  return (
    <div iv className="previous_reviews_section">
      <h2 className="review_section_title">
        Product Reviews ({product.reviews.length})
      </h2>

      {reviews.length ? (
        <div className="reviews_wrapper">
          {reviews.map((review) => {
            const { reviewer } = review;

            return (
              <div className="single_review" key={review._id}>
                <div className="single_review_header">
                  <div className="review_user_infos">
                    <div className="reviewer_avatar_container">
                      <Avatar src={reviewer.photoUrl} alt={reviewer.name} />
                    </div>
                    <div className="reviewer_info">
                      <h2>
                        <Link to={`/profile/${reviewer._id}`}>
                          {reviewer.name}
                        </Link>
                      </h2>
                      <p>{review.time}</p>
                    </div>
                  </div>

                  {/* the user can edit his own reviews */}
                  {reviewer._id === user._id && (
                    <div className="review_controls">
                      <div className="single_control">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div className="single_control">
                        <IconButton onClick={() => deleteReview(review._id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </div>

                <div className="single_review_body">
                  <p>{review.reviewText}</p>
                  <div className="review_stars">
                    <span>
                      <StarIcon />
                    </span>{" "}
                    {review.reviewStar}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // if the product has no reviews
        <div className="no_message">
          <h2>No Reviews</h2>
        </div>
      )}
    </div>
  );
};

export default Reviews;
