function TopProducts({ products }) {
  const topProducts = [...products]
    .sort(
      (a, b) =>
        Number(b.sold || 0) - Number(a.sold || 0)
    )
    .slice(0, 5);

  return (
    <>
      <h2 style={{ marginTop: "40px" }}>
        🏆 Top Selling Products
      </h2>

      {topProducts.length === 0 ? (
        <p>No Products Yet.</p>
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
          {topProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff",
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

              <p>💰 ₹{product.price}</p>

              <p>📦 Sold : {product.sold || 0}</p>

              <p>⭐ Rating : {product.rating || 0}</p>

              <p>📦 Stock : {product.stock || 0}</p>

              {Number(product.stock || 0) < 10 && (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  ⚠ Low Stock
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TopProducts;