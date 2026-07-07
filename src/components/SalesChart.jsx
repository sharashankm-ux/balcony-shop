import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function SalesChart() {
  const { orders } = useContext(OrderContext);

  const data = orders
    .slice(0, 6)
    .reverse()
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
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <h2>📈 Sales Analytics</h2>
        <p>No Sales Available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));

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
      <h2>📈 Recent Sales</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          height: "280px",
          marginTop: "25px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <strong
              style={{
                color: "#2e7d32",
                marginBottom: "8px",
              }}
            >
              ₹{item.value.toLocaleString()}
            </strong>

            <div
              style={{
                width: "45px",
                height: `${(item.value / maxValue) * 180}px`,
                background:
                  "linear-gradient(to top,#1b5e20,#66bb6a)",
                borderRadius: "8px 8px 0 0",
                transition: ".3s",
              }}
            />

            <span
              style={{
                marginTop: "10px",
                fontSize: "12px",
                fontWeight: "bold",
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