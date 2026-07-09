import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";

function RecentOrders() {
  const { orders } = useContext(OrderContext);

  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase();

    return (
      order.orderId?.toLowerCase().includes(keyword) ||
      order.customer?.toLowerCase().includes(keyword)
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#2e7d32";

      case "Cancelled":
        return "#d32f2f";

      case "Out For Delivery":
        return "#ff9800";

      case "Shipped":
        return "#1976d2";

      case "Packed":
        return "#7b1fa2";

      default:
        return "#616161";
    }
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h2>📋 Recent Orders ({orders.length})</h2>

        <input
          type="text"
          placeholder="🔍 Search Order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            width: "260px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none",
          }}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#777",
          }}
        >
          😔 No Orders Found
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
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={tdStyle}>{order.orderId}</td>

                <td style={tdStyle}>{order.customer}</td>

                <td style={tdStyle}>
                  ₹{Number(order.total || 0).toLocaleString()}
                </td>

                <td style={tdStyle}>
                  {order.payment || "Cash On Delivery"}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: getStatusColor(order.status),
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
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