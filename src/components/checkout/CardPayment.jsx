function CardPayment({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiry,
  setExpiry,
  cvv,
  setCvv,
}) {
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
      <h2>💳 Card Details</h2>

      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Card Holder Name"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        style={inputStyle}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
          }}
        />

        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: 0,
          }}
        />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #bbb",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default CardPayment;