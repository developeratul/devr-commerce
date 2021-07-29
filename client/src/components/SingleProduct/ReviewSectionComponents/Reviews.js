const Reviews = ({ product }) => {
  return (
    <div iv className="previous_reviews_section">
      <h2 className="review_section_title">
        Product Reviews ({product.reviews.length})
      </h2>

      {product.reviews.map((review) => {
        return (
          <div className="single_review" key={review._id}>
            <h2>{review.reviewStar}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
