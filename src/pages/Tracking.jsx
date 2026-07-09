import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function Tracking() {
  const { orders } = useContext(OrderContext);

  if (orders.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No Order Found</h2>;
  }

  const order = orders[0];

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h1>📦 Order Tracking</h1>

      <h3>Order ID: {order.orderId}</h3>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <hr />

      {order.trackingSteps?.map((step) => (
        <div
          key={step.title}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "15px 0",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              marginRight: "12px",
            }}
          >
            {step.completed ? "✅" : "⭕"}
          </span>

          <span>{step.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Tracking;