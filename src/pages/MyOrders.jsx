import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";

function MyOrders() {
  const navigate = useNavigate();

  const { orders } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h1>📦 No Orders Yet</h1>
        <p>Your placed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
      }}
    >
      <h1>📦 My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: "#fff",
            padding: "25px",
            marginTop: "20px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
          }}
        >
          <h2>Order ID : {order.orderId}</h2>

          <p>
            <strong>Customer :</strong> {order.customer}
          </p>

          <p>
            <strong>Payment :</strong> {order.payment}
          </p>

          <p>
            <strong>Status :</strong>

            <span
              style={{
                color: "green",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              {order.status}
            </span>
          </p>

          <p>
            <strong>Total :</strong> ₹{order.total}
          </p>

          <button
            onClick={() => navigate("/tracking")}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            📦 Track Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;