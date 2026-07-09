function LowStockProducts({ products }) {
  const lowStockProducts = products.filter(
    (product) => Number(product.stock || 0) <= 10
  );

  return (
    <>
      <h2 style={{ marginTop: "40px" }}>
        ⚠ Low Stock Products
      </h2>

      {lowStockProducts.length === 0 ? (
        <p style={{ color: "green" }}>
          ✅ All Products have sufficient stock.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff3cd",
                border: "2px solid #ffc107",
                borderRadius: "12px",
                padding: "15px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3>{product.name}</h3>

              <p>
                💰 Price : ₹{product.price}
              </p>

              <p>
                📦 Stock :
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {product.stock}
                </span>
              </p>

              <p>
                📈 Sold : {product.sold || 0}
              </p>

              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  background: "#ff9800",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🔄 Restock Soon
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default LowStockProducts;