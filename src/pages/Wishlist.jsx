import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h3>No products in Wishlist.</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {wishlist.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                background: "#fff",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h3>{product.name}</h3>

              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                ₹{product.price}
              </p>

              <button
                onClick={() => removeFromWishlist(product.id)}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;