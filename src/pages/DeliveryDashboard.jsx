import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function DeliveryDashboard() {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>🚚 Delivery Dashboard</h1>
        <h2>No Orders Available</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🚚 Delivery Dashboard</h1>

      {orders.map((order) => (
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
            <strong>Customer:</strong> {order.customer.name}
          </p>

          <p>
            <strong>Mobile:</strong> {order.customer.mobile}
          </p>

          <p>
            <strong>Address:</strong> {order.customer.address}
          </p>

          <p>
            <strong>City:</strong> {order.customer.city}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: "green",
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
            <button onClick={() => updateOrderStatus(order.id, "Packed")}>
              📦 Packed
            </button>

            <button onClick={() => updateOrderStatus(order.id, "Shipped")}>
              🚚 Shipped
            </button>

            <button
              onClick={() =>
                updateOrderStatus(order.id, "Out For Delivery")
              }
            >
              🛵 Out For Delivery
            </button>

            <button onClick={() => updateOrderStatus(order.id, "Delivered")}>
              ✅ Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeliveryDashboard;