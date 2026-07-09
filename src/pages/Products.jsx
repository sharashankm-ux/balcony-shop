import { useState, useContext } from "react";
import "./Products.css";

import ProductCard from "../components/ProductCard";

import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";

function Products() {
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(100000);

  // ⭐ New Filters
  const [stockFilter, setStockFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);

  let filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      product.category === category;

    const matchPrice =
      Number(product.price) <= maxPrice;

    const matchStock =
      stockFilter === "all"
        ? true
        : stockFilter === "instock"
        ? Number(product.stock) > 0
        : Number(product.stock) <= 0;

    const matchRating =
      Number(product.rating || 0) >= ratingFilter;

    return (
      matchSearch &&
      matchCategory &&
      matchPrice &&
      matchStock &&
      matchRating
    );
  });

  if (sort === "low-high") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) =>
        Number(b.rating || 0) -
        Number(a.rating || 0)
    );
  }
    return (
    <div className="products-page">
      <h1>🛍️ Our Products</h1>

      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Plants</option>
          <option>Pots</option>
          <option>Furniture</option>
          <option>Lighting</option>
          <option>Decoration</option>
          <option>Tools</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low-high">Price : Low → High</option>
          <option value="high-low">Price : High → Low</option>
          <option value="rating">⭐ Highest Rating</option>
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="all">All Stock</option>
          <option value="instock">In Stock</option>
          <option value="outofstock">Out of Stock</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) =>
            setRatingFilter(Number(e.target.value))
          }
        >
          <option value={0}>All Ratings</option>
          <option value={4}>⭐ 4 & Above</option>
          <option value={3}>⭐ 3 & Above</option>
          <option value={2}>⭐ 2 & Above</option>
        </select>

        <div style={{ minWidth: "220px" }}>
          <label>
            Max Price : <strong>₹{maxPrice}</strong>
          </label>

          <input
            type="range"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Number(e.target.value))
            }
            style={{ width: "100%" }}
          />
        </div>

      </div>

      <div className="products-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              color: "#666",
            }}
          >
            No Products Found 😔
          </h2>
        )}

      </div>
    </div>
  );
}

export default Products;