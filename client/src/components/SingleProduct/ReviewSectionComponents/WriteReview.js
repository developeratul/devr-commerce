import { Button } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const WriteReview = ({ product }) => {
  const [review, setReview] = useState({ text: "", stars: "" });
  const [responseSentToServer, setResponseSentToServer] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  // for handling input change
  function HandleInputChange(event) {
    const { name, value } = event.target;
    setReview((pre) => ({ ...pre, [name]: value }));
  }

  // for saving the review
  async function SaveReview() {
    setResponseSentToServer(true);

    try {
      const res = await fetch("/get_review/post_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars: review.stars,
          text: review.text,
          reviewer: user._id,
          productId: product._id,
          productAuthorId: product.user._id,
        }),
      });

      const body = await res.json();

      if (res.status === 200) {
        setResponseSentToServer(false);
        toast.dark(body.message);
        setReview({ text: "", stars: "" });
      }
    } catch (err) {
      setResponseSentToServer(false);
    }
  }

  return (
    <div className="write_review_section">
      <h2 className="review_section_title">Write a review</h2>

      <div className="single_field">
        <select name="stars" onChange={HandleInputChange} value={review.stars}>
          <option value="" disabled>
            Stars (1-5)
          </option>

          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="single_field">
        <textarea
          rows="5"
          placeholder="Write your review"
          name="text"
          onChange={HandleInputChange}
          value={review.text}
        ></textarea>
      </div>

      <div className="single_field">
        <Button
          onClick={SaveReview}
          disabled={!review.text || !review.stars || responseSentToServer}
          variant="contained"
        >
          Post Review
        </Button>
      </div>
    </div>
  );
};

export default WriteReview;
