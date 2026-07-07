import { Link } from "react-router-dom";

function OrderSuccess() {
  const orderId = "BS" + Math.floor(Math.random() * 100000);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        padding: "40px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "green", fontSize: "40px" }}>
        ✅ Order Placed Successfully!
      </h1>

      <h2>Your Order ID</h2>

      <h1
        style={{
          color: "#1976d2",
          margin: "20px 0",
        }}
      >
        #{orderId}
      </h1>

      <p
        style={{
          color: "#666",
          fontSize: "18px",
          lineHeight: "1.6",
        }}
      >
        Thank you for shopping with <strong>Balcony Shop</strong>.
        <br />
        Your order has been placed successfully.
      </p>

      <Link to="/products">
        <button
          style={{
            marginTop: "30px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            padding: "15px 28px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "17px",
          }}
        >
          🛍 Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;