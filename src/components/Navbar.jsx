import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);

  const [bounce, setBounce] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) return;

    setBounce(true);

    const timer = setTimeout(() => {
      setBounce(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [cartItems]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to="/" className="logo">
        🌿 Balcony Shop
      </NavLink>

      {/* Search */}
      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search Products..."
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Mobile Menu Button */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation */}
      <ul className={`nav-links ${menuOpen ? "active-menu" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            🏠 Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/products" onClick={closeMenu}>
            🛍 Products
          </NavLink>
        </li>

        <li>
          <NavLink to="/categories" onClick={closeMenu}>
            📂 Categories
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/wishlist"
            className="nav-icon"
            onClick={closeMenu}
          >
            ❤️
            {wishlist.length > 0 && (
              <span className="badge">
                {wishlist.length}
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cart"
            className={`cart-link nav-icon ${
              bounce ? "cart-bounce" : ""
            }`}
            onClick={closeMenu}
          >
            🛒
            {cartItems.length > 0 && (
              <span className="badge">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" onClick={closeMenu}>
            📦 Orders
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <NavLink to="/profile" onClick={closeMenu}>
                👤 Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/${user.role}`}
                onClick={closeMenu}
              >
                🏪 Dashboard
              </NavLink>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                🚪 Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" onClick={closeMenu}>
              🔐 Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;