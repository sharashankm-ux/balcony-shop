function SearchFilters({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  categories = [],
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search Product / Order..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          minWidth: "250px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          minWidth: "180px",
        }}
      >
        <option value="All">All Categories</option>

        {categories.map((cat) => (
          <option
            key={cat.id || cat.name}
            value={cat.name}
          >
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          minWidth: "180px",
        }}
      >
        <option value="All">All Status</option>
        <option value="Order Placed">
          Order Placed
        </option>
        <option value="Packed">
          Packed
        </option>
        <option value="Shipped">
          Shipped
        </option>
        <option value="Out For Delivery">
          Out For Delivery
        </option>
        <option value="Delivered">
          Delivered
        </option>
        <option value="Cancelled">
          Cancelled
        </option>
      </select>
    </div>
  );
}

export default SearchFilters;