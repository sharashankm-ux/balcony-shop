import { useState } from "react";

function CouponBox({ subtotal, setDiscount }) {
  const [coupon, setCoupon] = useState("");

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "WELCOME100") {
      setDiscount(100);
      alert("🎉 Coupon Applied! ₹100 OFF");
    } else if (coupon.toUpperCase() === "SAVE10") {
      const discount = Math.round(subtotal * 0.1);
      setDiscount(discount);
      alert("🎉 10% Discount Applied");
    } else {
      setDiscount(0);
      alert("❌ Invalid Coupon");
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2>🎟 Apply Coupon</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter Coupon Code"
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "8px",
            border: "1px solid #bbb",
          }}
        />

        <button
          onClick={applyCoupon}
          style={{
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            padding: "0 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Apply
        </button>
      </div>

      <p
        style={{
          marginTop: "15px",
          color: "#666",
        }}
      >
        Try:
        <br />
        <strong>WELCOME100</strong>
        <br />
        <strong>SAVE10</strong>
      </p>
    </div>
  );
}

export default CouponBox;