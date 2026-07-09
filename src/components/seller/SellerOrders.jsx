import PDFInvoice from "../PDFInvoice";
function SellerOrders({
  sellerOrders,
  user,
  updateOrderStatus,
  setSelectedOrder,
  setShowOrderModal,
}) {
  return (
    <>
      <h2 style={{ marginTop: "40px" }}>
        📦 Incoming Orders
      </h2>

      {sellerOrders.length === 0 ? (
        <p>No Orders Yet.</p>
      ) : (
        sellerOrders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,.12)",
            }}
          >
            <h3>📦 Order ID : {order.orderId}</h3>

            <p>
              <strong>👤 Customer :</strong>{" "}
              {order.customer}
            </p>

            <p>
              <strong>📱 Mobile :</strong>{" "}
              {order.mobile}
            </p>

            <p>
              <strong>📧 Buyer :</strong>{" "}
              {order.buyerEmail}
            </p>

            <p>
              <strong>📍 Address :</strong>{" "}
              {order.address},
              {" "}
              {order.city}
              {" - "}
              {order.pincode}
            </p>

            <p>
              <strong>💳 Payment :</strong>{" "}
              {order.payment}
            </p>

            <p>
              <strong>💰 Total :</strong> ₹
              {order.total}
            </p>

            <p>
              <strong>📅 Date :</strong>{" "}
              {order.createdAt?.seconds
                ? new Date(
                    order.createdAt.seconds *
                      1000
                  ).toLocaleString()
                : "Just Now"}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              <span
                style={{
                  background:
                    order.status === "Delivered"
                      ? "#4caf50"
                      : order.status ===
                        "Cancelled"
                      ? "#e53935"
                      : order.status ===
                        "Shipped"
                      ? "#2196f3"
                      : order.status ===
                        "Packed"
                      ? "#ff9800"
                      : "#9c27b0",

                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <h4
              style={{
                marginTop: "20px",
              }}
            >
              🛍 Products
            </h4>

            {order.items
              ?.filter(
                (item) =>
                  item.sellerId ===
                  user?.uid
              )
              .map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    marginBottom: "15px",
                    borderBottom:
                      "1px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <div>
                    <h4>
                      {item.productName}
                    </h4>

                    <p>
                      Qty :
                      {item.quantity}
                    </p>

                    <p>
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
                          <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                👁 View Details
              </button>
              <PDFInvoice order={order} />

              <button
                onClick={() =>
                  updateOrderStatus(order.id, "Packed")
                }
                style={{
                  background: "#ff9800",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                📦 Packed
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(order.id, "Shipped")
                }
                style={{
                  background: "#2196f3",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🚚 Shipped
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Out For Delivery"
                  )
                }
                style={{
                  background: "#9c27b0",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🏠 Out For Delivery
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Delivered"
                  )
                }
                style={{
                  background: "#4caf50",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ✅ Delivered
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Cancelled"
                  )
                }
                style={{
                  background: "#e53935",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
                  ))
      )}
    </>
  );
}

export default SellerOrders;