import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReviewProvider from "./context/ReviewContext";
import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";
import WishlistProvider from "./context/WishlistContext";
import OrderProvider from "./context/OrderContext";
import CategoryProvider from "./context/CategoryContext";
import SearchProvider from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <SearchProvider>
              <WishlistProvider>
                <CartProvider>
                  <OrderProvider>
                    <ReviewProvider>
                    <App />
                    </ReviewProvider>
                  </OrderProvider>
                </CartProvider>
              </WishlistProvider>
            </SearchProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);