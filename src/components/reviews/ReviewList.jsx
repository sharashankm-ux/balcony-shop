import { useContext } from "react";
import { ReviewContext } from "../../context/ReviewContext";
import RatingStars from "./RatingStars";

function ReviewList({ productId }) {
  const {
    getProductReviews,
  } = useContext(ReviewContext);

  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return (
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <h3>⭐ Customer Reviews</h3>

        <p>No Reviews Yet.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <h2>⭐ Customer Reviews</h2>

      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            background: "#fff",
            padding: "20px",
            marginTop: "15px",
            borderRadius: "10px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h4>{review.buyerName}</h4>

          <RatingStars
            rating={review.rating}
          />

          <p
            style={{
              marginTop: "10px",
              lineHeight: "24px",
            }}
          >
            {review.review}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;