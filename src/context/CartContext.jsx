import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exist = cartItems.find(
      (item) => item.id === product.id
    );

    const stock = Number(product.stock || 0);

    if (stock <= 0) {
      alert("❌ Product is Out of Stock");
      return;
    }

    if (exist) {
      if (exist.quantity >= stock) {
        alert(`⚠ Only ${stock} item(s) available`);
        return;
      }

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id !== id) return item;

        const stock = Number(item.stock || 0);

        if (item.quantity >= stock) {
          alert(`⚠ Only ${stock} item(s) available`);
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;