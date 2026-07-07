import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function OrderTracking() {
  const { orders } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
        }}
      >
        <h1>No Order Found</h1>
      </div>
    );
  }

  // Latest Order
  const order = orders[0];

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>🚚 Track Order</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
          color: "#222",
        }}
      >
        <h2>Order ID : {order.orderId}</h2>

        <p>
          <strong>Customer :</strong> {order.customer}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>
            {order.status}
          </span>
        </p>
      </div>

      <div
        style={{
          borderLeft: "5px solid green",
          paddingLeft: "25px",
        }}
      >
        {order.trackingSteps.map((step, index) => (
          <div
            key={index}
            style={{
              marginBottom: "35px",
            }}
          >
            <h2>
              {step.completed ? "✅" : "⭕"} {step.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTracking;