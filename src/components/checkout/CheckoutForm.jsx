function CheckoutForm({
  form,
  handleChange,
  saveAddress,
  setSaveAddress,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          color: "#2e7d32",
        }}
      >
        📍 Delivery Address
      </h2>

      <label style={labelStyle}>Full Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter Full Name"
        style={inputStyle}
      />

      <label style={labelStyle}>Mobile Number</label>
      <input
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        placeholder="Enter Mobile Number"
        style={inputStyle}
      />

      <label style={labelStyle}>Address</label>
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="House No, Street, Area..."
        rows={4}
        style={textAreaStyle}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>City</label>

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            style={inputStyle}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Pincode</label>

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            style={inputStyle}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "15px",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) =>
              setSaveAddress(e.target.checked)
            }
          />

          💾 Save this address for next time
        </label>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  marginTop: "15px",
  fontWeight: "bold",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  fontSize: "16px",
  boxSizing: "border-box",
  outline: "none",
};

const textAreaStyle = {
  width: "100%",
  padding: "14px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  fontSize: "16px",
  resize: "none",
  boxSizing: "border-box",
  outline: "none",
};

export default CheckoutForm;