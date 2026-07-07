function SavedAddress({ form, onChangeAddress }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        marginBottom: "25px",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        📍 Saved Address
      </h2>

      <p>
        <strong>{form.name}</strong>
      </p>

      <p>{form.mobile}</p>

      <p>{form.address}</p>

      <p>
        {form.city} - {form.pincode}
      </p>

      <button
        onClick={onChangeAddress}
        style={{
          marginTop: "15px",
          padding: "10px 18px",
          border: "none",
          borderRadius: "8px",
          background: "#2e7d32",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ✏️ Change Address
      </button>
    </div>
  );
}

export default SavedAddress;