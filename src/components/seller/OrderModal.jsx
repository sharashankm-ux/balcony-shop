import PDFInvoice from "../PDFInvoice";
function OrderModal({
  showOrderModal,
  selectedOrder,
  setShowOrderModal,
}) {
  if (!showOrderModal || !selectedOrder)
    return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "700px",
          maxWidth: "95%",
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <h2>📦 Order Details</h2>

        <hr />

        <p>
          <strong>Order ID :</strong>{" "}
          {selectedOrder.orderId}
        </p>

        <p>
          <strong>Customer :</strong>{" "}
          {selectedOrder.customer}
        </p>

        <p>
          <strong>Mobile :</strong>{" "}
          {selectedOrder.mobile}
        </p>

        <p>
          <strong>Email :</strong>{" "}
          {selectedOrder.buyerEmail}
        </p>

        <p>
          <strong>Payment :</strong>{" "}
          {selectedOrder.payment}
        </p>

        <p>
          <strong>Total :</strong> ₹
          {selectedOrder.total}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          {selectedOrder.status}
        </p>

        <p>
          <strong>Address :</strong>{" "}
          {selectedOrder.address},
          {" "}
          {selectedOrder.city}
          {" - "}
          {selectedOrder.pincode}
        </p>

        <hr />

        <h3>🛍 Ordered Products</h3>

        {selectedOrder.items?.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            <img
              src={item.image}
              alt={item.productName}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <div>
              <h4>{item.productName}</h4>

              <p>₹{item.price}</p>

              <p>
                Quantity : {item.quantity}
              </p>

              <p>
                Seller : {item.sellerEmail}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setShowOrderModal(false)
          }
          style={{
            width: "100%",
            padding: "14px",
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderModal;