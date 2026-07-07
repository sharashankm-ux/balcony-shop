import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function RecentOrders() {
  const { orders } = useContext(OrderContext);

  return (
    <div
      style={{
        background: "#fff",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h2>📋 Recent Orders</h2>

      {orders.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          No Orders Available
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#2e7d32",
                color: "#fff",
              }}
            >
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Payment</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={tdStyle}>{order.orderId}</td>

                <td style={tdStyle}>
                  {order.customer}
                </td>

                <td style={tdStyle}>
                  ₹{Number(order.total).toLocaleString()}
                </td>

                <td style={tdStyle}>
                  {order.payment}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    fontWeight: "bold",
                    color:
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Out For Delivery"
                        ? "#ff9800"
                        : "#1976d2",
                  }}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  color: "#222",
};

export default RecentOrders;