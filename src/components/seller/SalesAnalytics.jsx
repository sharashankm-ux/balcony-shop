import SalesChart from "../SalesChart";

function SalesAnalytics({
  totalRevenue,
  totalOrders,
  deliveredOrders,
  totalProducts,
  totalStock,
  averagePrice,
}) {
  return (
    <>
      <h2 style={{ marginTop: "40px" }}>
        📊 Sales Analytics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#4caf50",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Revenue</h3>
          <h2>₹{totalRevenue}</h2>
        </div>

        <div
          style={{
            background: "#2196f3",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div
          style={{
            background: "#9c27b0",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Delivered</h3>
          <h2>{deliveredOrders}</h2>
        </div>

        <div
          style={{
            background: "#ff9800",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div
          style={{
            background: "#009688",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Total Stock</h3>
          <h2>{totalStock}</h2>
        </div>

        <div
          style={{
            background: "#795548",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>Average Price</h3>
          <h2>₹{averagePrice}</h2>
        </div>
      </div>

      <SalesChart />
    </>
  );
}

export default SalesAnalytics;