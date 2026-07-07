function UpiPayment({ upiId, setUpiId }) {
  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2>📱 UPI Payment</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button style={btnStyle}>🟢 Google Pay</button>

        <button style={btnStyle}>🟣 PhonePe</button>

        <button style={btnStyle}>🔵 Paytm</button>
      </div>

      <input
        type="text"
        placeholder="Enter UPI ID (example@okaxis)"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        style={{
          width: "100%",
          marginTop: "25px",
          padding: "14px",
          borderRadius: "8px",
          border: "1px solid #bbb",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

const btnStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f5f5f5",
  fontWeight: "bold",
};

export default UpiPayment;