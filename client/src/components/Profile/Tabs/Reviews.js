import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

import StarBorderIcon from "@material-ui/icons/StarBorder";

const Reviews = ({ TabPanel, value, theme }) => {
  const user = useSelector((state) => state.profileReducer);
  const reviews = user.reviews;

  return (
    <div className="following_tab tab">
      <TabPanel value={value} index={3} dir={theme.direction}>
        {reviews.length ? (
          <div className="follower_users_container user_container">
            {reviews.map((review) => {
              const reviewer = review.reviewer;

              return (
                <div className="single_review" key={review._id}>
                  <div className="reviewer_image">
                    <Avatar src={reviewer.photoUrl} alt={reviewer.name} />
                  </div>

                  <div className="review_desc">
                    <h2>
                      <Link to={`/profile/${reviewer._id}`}>
                        {reviewer.name}
                      </Link>
                    </h2>

                    <p>{review.reviewText}</p>

                    <div className="reviewStar">
                      {review.reviewStar}{" "}
                      <span>
                        <StarBorderIcon />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no_message">
            <h2>No Reviews</h2>
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default Reviews;
