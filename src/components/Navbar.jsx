import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) return;

    setBounce(true);

    const timer = setTimeout(() => {
      setBounce(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [cartItems]);

  return (
    <nav className="navbar">
      <div className="logo">
        🌿 Balcony Shop
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/categories">Categories</Link>
        </li>

        <li>
          <Link to="/wishlist">
            ❤️ Wishlist ({wishlist.length})
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className={`cart-link ${bounce ? "cart-bounce" : ""}`}
          >
            🛒 Cart ({cartItems.length})
          </Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;