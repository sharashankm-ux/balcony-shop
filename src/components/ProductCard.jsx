import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const { addToWishlist } = useContext(WishlistContext);

  const [added, setAdded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const stock = Number(product.stock || 0);
  const rating = Number(product.rating || 4.5);

  const handleAddToCart = () => {
    if (stock <= 0) {
      alert("❌ Product is Out of Stock");
      return;
    }

    onAddToCart(product);

    setAdded(true);
    setShowMessage(true);

    setTimeout(() => {
      setAdded(false);
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="product-card">

      <div style={{ position: "relative" }}>

        <img
          src={product.image}
          alt={product.name}
          onClick={() => navigate(`/products/${product.id}`)}
          style={{ cursor: "pointer" }}
        />

        {stock <= 0 ? (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "red",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            Out of Stock
          </div>
        ) : stock <= 5 ? (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "orange",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            Only {stock} Left
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "green",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            In Stock
          </div>
        )}

      </div>

      <div className="product-info">

        <h3
          onClick={() => navigate(`/products/${product.id}`)}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>

        <div
          style={{
            color: "#ff9800",
            fontSize: "18px",
            marginBottom: "8px",
          }}
        >
          {"★".repeat(Math.round(rating))}
          {"☆".repeat(5 - Math.round(rating))}

          <span
            style={{
              color: "#555",
              marginLeft: "8px",
              fontSize: "14px",
            }}
          >
            ({rating})
          </span>
        </div>

        <h2>₹{product.price}</h2>
        
        <p
          style={{
            color: stock > 0 ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          Stock : {stock}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: stock <= 0 ? "not-allowed" : "pointer",
            color: "#fff",
            fontWeight: "bold",
            background:
              stock <= 0
                ? "#999"
                : added
                ? "#1b5e20"
                : "#43a047",
            transition: ".3s",
          }}
        >
          {stock <= 0
            ? "Out of Stock"
            : added
            ? "✔ Added"
            : "🛒 Add To Cart"}
        </button>

        {showMessage && (
          <div
            style={{
              marginTop: "10px",
              background: "#d4edda",
              color: "#155724",
              padding: "8px",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            ✅ Product added to cart!
          </div>
        )}

        <button
          onClick={() => addToWishlist(product)}
          style={{
            width: "100%",
            marginTop: "10px",
            background: "#e91e63",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ❤️ Add To Wishlist
        </button>

        <button
          onClick={() => navigate(`/products/${product.id}`)}
          style={{
            width: "100%",
            marginTop: "10px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          👁 View Details
        </button>

      </div>
    </div>
  );
}

export default ProductCard;