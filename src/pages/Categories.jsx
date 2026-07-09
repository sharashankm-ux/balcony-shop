import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function Categories() {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const categories = [...new Set(products.map((item) => item.category))];

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        📂 Product Categories
      </h1>

      {categories.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          No Categories Available
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate("/products")}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "35px",
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,.1)",
                transition: ".3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <h2 style={{ color: "#2e7d32" }}>{category}</h2>

              <p style={{ marginTop: "10px", color: "#666" }}>
                {
                  products.filter(
                    (item) => item.category === category
                  ).length
                }{" "}
                Products
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;