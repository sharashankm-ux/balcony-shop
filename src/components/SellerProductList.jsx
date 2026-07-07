function SellerProductList({ products, onDelete, onEdit }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ color: "#222" }}>My Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <thead>
            <tr style={{ background: "#2e7d32", color: "#fff" }}>
              <th style={th}>Image</th>
              <th style={th}>ID</th>
              <th style={th}>Product</th>
              <th style={th}>Category</th>
              <th style={th}>Price</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={td}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td style={td}>{product.id}</td>
                <td style={td}>{product.name}</td>
                <td style={td}>{product.category}</td>
                <td style={td}>₹{product.price}</td>

                <td style={td}>
                  <button
                    onClick={() => onEdit(product)}
                    style={{
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "5px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
                    style={{
                      background: "#d32f2f",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  border: "2px solid #555",
  padding: "12px",
};

const td = {
  border: "2px solid #777",
  padding: "12px",
  color: "#111",
  fontWeight: "600",
};

export default SellerProductList;