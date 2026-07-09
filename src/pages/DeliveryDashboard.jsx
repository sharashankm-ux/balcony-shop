import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function DeliveryDashboard() {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  const deliveryOrders = orders.filter(
    (order) =>
      order.status === "Packed" ||
      order.status === "Shipped" ||
      order.status === "Out For Delivery"
  );

  if (deliveryOrders.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1>🚚 Delivery Dashboard</h1>
        <h2>No Assigned Orders</h2>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Packed":
        return "#7b1fa2";

      case "Shipped":
        return "#1976d2";

      case "Out For Delivery":
        return "#ff9800";

      case "Delivered":
        return "#2e7d32";

      default:
        return "#555";
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🚚 Delivery Dashboard</h1>

      {deliveryOrders.map((order) => (
        <div
          key={order.id}
          style={{
            background: "#fff",
            padding: "20px",
            marginTop: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            color: "#222",
          }}
        >
          <h2>{order.orderId}</h2>

          <p>
            <strong>Customer:</strong>{" "}
            {typeof order.customer === "object"
              ? order.customer?.name
              : order.customer}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {order.customer?.mobile || "Not Available"}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {order.customer?.address || "Not Available"}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {order.customer?.city || "Not Available"}
          </p>

          <p>
            <strong>Total:</strong> ₹
            {Number(order.total || 0).toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                background: getStatusColor(order.status),
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              {order.status}
            </span>
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                updateOrderStatus(order.id, "Packed")
              }
            >
              📦 Packed
            </button>

            <button
              onClick={() =>
                updateOrderStatus(order.id, "Shipped")
              }
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
            >
              🛵 Out For Delivery
            </button>

            <button
              onClick={() =>
                updateOrderStatus(order.id, "Delivered")
              }
            >
              ✅ Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeliveryDashboard;