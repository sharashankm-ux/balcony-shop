import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";

function AdminStats() {
  const { products } = useContext(ProductContext);
  const { orders } = useContext(OrderContext);

  // Revenue (Only Delivered Orders)
  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

  // Total Customers
  const uniqueCustomers = [
    ...new Set(
      orders
        .map((order) => order.customer)
        .filter(Boolean)
    ),
  ];

  // Delivered Orders
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cards = [
    {
      title: "Products",
      value: products.length,
      icon: "📦",
      color: "#4CAF50",
    },
    {
      title: "Orders",
      value: orders.length,
      icon: "🛒",
      color: "#2196F3",
    },
    {
      title: "Customers",
      value: uniqueCustomers.length,
      icon: "👥",
      color: "#FF9800",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: "💰",
      color: "#9C27B0",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: "✅",
      color: "#009688",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: card.color,
            color: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 8px 18px rgba(0,0,0,.15)",
            transition: "0.3s",
          }}
        >
          <h2 style={{ margin: 0 }}>
            {card.icon} {card.title}
          </h2>

          <h1 style={{ marginTop: "15px" }}>
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;