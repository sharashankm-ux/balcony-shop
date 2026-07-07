import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const { addToWishlist } = useContext(WishlistContext);

  const [added, setAdded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);

    setAdded(true);
    setShowMessage(true);

    setTimeout(() => {
      setAdded(false);
      setShowMessage(false);
    }, 2000);
  };

  const rating = Number(product.rating || 4.5);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/products/${product.id}`)}
        style={{ cursor: "pointer" }}
      />

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
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            ({rating})
          </span>
        </div>

        <h2>₹{product.price}</h2>

        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            background: added ? "#1b5e20" : "#43a047",
            transition: "0.3s",
          }}
        >
          {added ? "✔ Added" : "🛒 Add To Cart"}
        </button>

        {showMessage && (
          <div
            style={{
              marginTop: "8px",
              background: "#d4edda",
              color: "#155724",
              padding: "8px",
              borderRadius: "6px",
              fontSize: "14px",
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
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
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
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
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