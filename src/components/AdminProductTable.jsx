import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function AdminProductTable() {
  const {
    products,
    deleteProduct,
    editProduct,
  } = useContext(ProductContext);

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
      <h2>📦 Product Management</h2>

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
            <th style={th}>Image</th>
            <th style={th}>Product</th>
            <th style={th}>Category</th>
            <th style={th}>Price</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#777",
                }}
              >
                No Products Available
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item.id}>
                <td style={td}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td style={td}>
                  <strong>{item.name}</strong>
                </td>

                <td style={td}>{item.category}</td>

                <td style={td}>
                  ₹{Number(item.price).toLocaleString()}
                </td>

                <td style={td}>
                  <button
                    onClick={() => editProduct(item)}
                    style={{
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this product permanently?"
                        )
                      ) {
                        deleteProduct(item.id);
                      }
                    }}
                    style={{
                      background: "#d32f2f",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "12px",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  color: "#222",
};

export default AdminProductTable;