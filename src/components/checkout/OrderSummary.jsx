function OrderSummary({
  cartItems,
  subtotal,
  delivery,
  gst,
  grandTotal,
}) {
  return (
    <div
      style={{
        marginTop: "35px",
        background: "#f8f9fa",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid #ddd",
      }}
    >
      <h2 style={{ color: "#222" }}>
        🛒 Order Summary
      </h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
            fontSize: "17px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          <span>
            {item.name} × {item.quantity}
          </span>

          <span>
            ₹{item.price * item.quantity}
          </span>
        </div>
      ))}

      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span>Subtotal</span>

        <span>₹{subtotal}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span>Delivery</span>

        <span
          style={{
            color: delivery === 0 ? "green" : "#222",
          }}
        >
          {delivery === 0
            ? "FREE 🎉"
            : `₹${delivery}`}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span>GST (18%)</span>

        <span>₹{gst}</span>
      </div>

      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#2e7d32",
        }}
      >
        <span>Grand Total</span>

        <span>₹{grandTotal}</span>
      </div>
    </div>
  );
}

export default OrderSummary;