import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function SalesChart() {
  const { orders } = useContext(OrderContext);

  // Only Delivered Orders
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  );

  const data = deliveredOrders
    .slice(-6)
    .map((order, index) => ({
      label: order.orderId || `#${index + 1}`,
      value: Number(order.total || 0),
    }));

  if (data.length === 0) {
    return (
      <div
        style={{
          background: "#fff",
          marginTop: "30px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <h2>📈 Sales Analytics</h2>
        <p
          style={{
            color: "#777",
            marginTop: "20px",
          }}
        >
          No Delivered Sales Available
        </p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div
      style={{
        background: "#fff",
        marginTop: "30px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h2>📈 Recent Sales</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          gap: "15px",
          height: "300px",
          marginTop: "30px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <strong
              style={{
                color: "#1b5e20",
                marginBottom: "8px",
              }}
            >
              ₹{item.value.toLocaleString()}
            </strong>

            <div
              title={`₹${item.value}`}
              style={{
                width: "55px",
                height: `${(item.value / maxValue) * 200}px`,
                background:
                  "linear-gradient(to top,#1b5e20,#4caf50,#81c784)",
                borderRadius: "10px 10px 0 0",
                transition: "0.3s",
                cursor: "pointer",
              }}
            />

            <span
              style={{
                marginTop: "10px",
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesChart;