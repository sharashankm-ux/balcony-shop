import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../../firebase";
import RatingStars from "./RatingStars";

function ReviewForm({ product }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitReview = async () => {
    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId: product.id,
        buyerId: auth.currentUser?.uid,
        buyerName:
          auth.currentUser?.displayName ||
          auth.currentUser?.email,
        rating,
        review,
        createdAt: serverTimestamp(),
      });

      alert("Review Submitted ✅");
      setReview("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h3>⭐ Write a Review</h3>

      <RatingStars
        rating={rating}
        editable={true}
        onRatingChange={setRating}
      />

      <textarea
        rows="4"
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
        placeholder="Write your review..."
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={submitReview}
        style={{
          marginTop: "15px",
          background: "#4caf50",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>
    </div>
  );
}

export default ReviewForm;