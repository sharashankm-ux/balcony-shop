import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 999 ? 0 : 50;
  const gst = Math.round(subtotal * 0.18);
  const totalPrice = subtotal + delivery + gst;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Your Cart is Empty</h1>

        <p>Add some products to your cart.</p>

        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "12px 24px",
            marginTop: "20px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>🛒 Shopping Cart</h1>

      {cartItems.map((item) => (

        <div className="cart-item" key={item.id}>

          <img
            src={item.image}
            alt={item.name}
          />

          <div className="cart-details">

            <h2>{item.name}</h2>

            <p>
              Price : <strong>₹{item.price}</strong>
            </p>

            <p>
              Stock :
              <strong
                style={{
                  color:
                    item.stock <= 5
                      ? "red"
                      : "green",
                }}
              >
                {" "}
                {item.stock}
              </strong>
            </p>

            <div className="quantity">

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </button>

            </div>

            <h3>
              Total : ₹
              {item.price * item.quantity}
            </h3>

            <button
              className="remove-btn"
              onClick={() =>
                removeItem(item.id)
              }
            >
              🗑 Remove
            </button>

          </div>

        </div>

      ))}
            <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <h2>📋 Order Summary</h2>

        <hr />

        <p>
          <strong>Subtotal :</strong> ₹{subtotal}
        </p>

        <p>
          <strong>GST (18%) :</strong> ₹{gst}
        </p>

        <p>
          <strong>Delivery :</strong>{" "}
          {delivery === 0 ? "FREE" : `₹${delivery}`}
        </p>

        <hr />

        <h2 style={{ color: "#2e7d32" }}>
          Grand Total : ₹{totalPrice}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🛍 Continue Shopping
          </button>

          <button
            onClick={clearCart}
            style={{
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🗑 Clear Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              background: "#2e7d32",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✅ Proceed to Checkout
          </button>
        </div>
      </div>

    </div>
  );
}

export default Cart;