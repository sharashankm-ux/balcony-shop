import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";

import AddProductForm from "../components/AddProductForm";
import SellerProductList from "../components/SellerProductList";

function SellerDashboard() {
  const {
    products,
    addProduct,
    deleteProduct,
    editProduct,
    updateProduct,
    editingProduct,
  } = useContext(ProductContext);

  const { orders, updateOrderStatus } = useContext(OrderContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>🏪 Seller Dashboard</h1>

      <AddProductForm
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        editingProduct={editingProduct}
      />

      <hr style={{ margin: "30px 0" }} />

      <SellerProductList
        products={products}
        onDelete={deleteProduct}
        onEdit={editProduct}
      />

      <hr style={{ margin: "40px 0" }} />

      <h2>📦 Incoming Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
              color: "#222",
            }}
          >
            <h3>Order ID : {order.orderId}</h3>

            <p>
              <strong>Customer :</strong> {order.customer}
            </p>

            <p>
              <strong>Total :</strong> ₹{order.total}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() =>
                  updateOrderStatus(order.id, "Packed")
                }
                style={{
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ✅ Accept & Pack
              </button>

              <button
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SellerDashboard;