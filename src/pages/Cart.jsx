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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Your Cart is Empty</h1>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>🛒 Shopping Cart</h1>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div className="cart-details">
            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <div className="quantity">
              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>
            </div>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-footer">
        <h2>Total: ₹{totalPrice}</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              background: "#2e7d32",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
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