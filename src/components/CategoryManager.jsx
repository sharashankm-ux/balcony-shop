import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";

function CategoryManager() {
  const { categories, addCategory, deleteCategory } =
    useContext(CategoryContext);

  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Enter category name");
      return;
    }

    await addCategory(name);

    setName("");
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        marginBottom: "30px",
      }}
    >
      <h2>📂 Category Management</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <button
          onClick={handleAdd}
          style={{
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ➕ Add
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {categories.length === 0 ? (
          <p>No Categories</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            >
              <span>{category.name}</span>

              <button
                onClick={() => deleteCategory(category.id)}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryManager;