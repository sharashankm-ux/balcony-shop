function RatingStars({
  rating = 0,
  size = 24,
  onRatingChange,
  editable = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => {
            if (editable && onRatingChange) {
              onRatingChange(star);
            }
          }}
          style={{
            fontSize: size,
            cursor: editable
              ? "pointer"
              : "default",
            color:
              star <= rating
                ? "#FFD700"
                : "#ccc",
            transition: ".2s",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;