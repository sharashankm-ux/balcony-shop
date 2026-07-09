import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const product = products.find((item) => item.id === id);

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(list);
    });

    return () => unsubscribe();
  }, [id]);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>❌ Product Not Found</h2>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, item) => sum + Number(item.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const submitReview = async () => {
    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId: product.id,
        productName: product.name,

        userId: user?.uid || "",
        userEmail: user?.email || "Guest",

        rating,
        review,

        createdAt: serverTimestamp(),
      });

      alert("⭐ Review Submitted Successfully!");

      setReview("");
      setRating(5);
    } catch (error) {
      console.log(error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        display: "flex",
        gap: "40px",
        padding: "30px",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "12px",
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h1>{product.name}</h1>

        <div
          style={{
            color: "#ff9800",
            fontSize: "24px",
            margin: "10px 0",
          }}
        >
          ⭐ {averageRating} / 5
          <br />
          <small>
            ({reviews.length} Reviews)
          </small>
        </div>

        <h2 style={{ color: "#2e7d32" }}>
          ₹{product.price}
        </h2>

        <p>
          <strong>Category :</strong> {product.category}
        </p>

        <p
          style={{
            color: "#555",
            lineHeight: "1.8",
          }}
        >
          Premium quality balcony product made with durable materials.
          Perfect for home decoration and modern living.
        </p>
                <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => addToCart(product)}
            style={buttonGreen}
          >
            🛒 Add To Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            style={buttonPink}
          >
            ❤️ Wishlist
          </button>

          <button
            onClick={() => navigate(-1)}
            style={buttonGray}
          >
            ⬅ Back
          </button>
        </div>

        <hr style={{ margin: "35px 0" }} />

        <h2>⭐ Write a Review</h2>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          rows="5"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
          }}
        />

        <button
          onClick={submitReview}
          style={{
            marginTop: "15px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ⭐ Submit Review
        </button>

        <hr style={{ margin: "35px 0" }} />

        <h2>💬 Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p>No Reviews Yet.</p>
        ) : (
          reviews.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#f5f5f5",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "15px",
              }}
            >
              <strong>{item.userEmail}</strong>

              <p
                style={{
                  color: "#ff9800",
                  margin: "5px 0",
                }}
              >
                {"⭐".repeat(item.rating)}
              </p>

              <p>{item.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const buttonGreen = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonPink = {
  background: "#e91e63",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonGray = {
  background: "#555",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ProductDetails;