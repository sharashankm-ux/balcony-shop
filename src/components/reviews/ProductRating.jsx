import { useContext } from "react";
import { ReviewContext } from "../../context/ReviewContext";
import RatingStars from "./RatingStars";

function ProductRating({ productId, size = 18 }) {
  const {
    getAverageRating,
    getProductReviews,
  } = useContext(ReviewContext);

  const averageRating = Number(
    getAverageRating(productId)
  );

  const totalReviews =
    getProductReviews(productId).length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "8px",
        flexWrap: "wrap",
      }}
    >
      <RatingStars
        rating={Math.round(averageRating)}
        size={size}
      />

      <span
        style={{
          fontWeight: "bold",
          color: "#444",
        }}
      >
        {averageRating || 0}
      </span>

      <span
        style={{
          color: "#777",
        }}
      >
        ({totalReviews} Reviews)
      </span>
    </div>
  );
}

export default ProductRating;