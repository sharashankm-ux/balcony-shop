function DashboardCards({
  totalProducts,
  totalOrders,
  totalRevenue,
  deliveredOrders,
  totalStock,
  averagePrice,
}) {
  const cards = [
    {
      title: "Products",
      icon: "📦",
      value: totalProducts,
      color: "#4CAF50",
    },
    {
      title: "Orders",
      icon: "🛒",
      value: totalOrders,
      color: "#2196F3",
    },
    {
      title: "Revenue",
      icon: "💰",
      value: `₹${totalRevenue}`,
      color: "#FF9800",
    },
    {
      title: "Delivered",
      icon: "🚚",
      value: deliveredOrders,
      color: "#9C27B0",
    },
    {
      title: "Stock",
      icon: "📦",
      value: totalStock,
      color: "#009688",
    },
    {
      title: "Avg Price",
      icon: "💵",
      value: `₹${averagePrice}`,
      color: "#795548",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        margin: "25px 0",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: card.color,
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.15)",
            transition: ".3s",
          }}
        >
          <h3>
            {card.icon} {card.title}
          </h3>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;