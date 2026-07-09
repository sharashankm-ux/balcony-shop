import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

function AdminProductTable() {
  const {
    products,
    deleteProduct,
    editProduct,
  } = useContext(ProductContext);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

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
          marginBottom: "20px",
        }}
      >
        <h2>📦 Product Management ({products.length})</h2>

        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            width: "260px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
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
            <th style={th}>Status</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "35px",
                  color: "#777",
                }}
              >
                😔 No Products Found
              </td>
            </tr>
          ) : (
            filteredProducts.map((item) => (
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
                  <span
                    style={{
                      background:
                        item.status === "Active"
                          ? "#4CAF50"
                          : "#f44336",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {item.status || "Active"}
                  </span>
                </td>

                <td style={td}>
                  <button
                    onClick={() => editProduct(item)}
                    style={editBtn}
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
                    style={deleteBtn}
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

const editBtn = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};

const deleteBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminProductTable;