import ExportOrdersExcel from "../components/ExportOrdersExcel";
import { useContext, useState } from "react";

import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { CategoryContext } from "../context/CategoryContext";

import AddProductForm from "../components/AddProductForm";
import SellerProductList from "../components/SellerProductList";

import DashboardCards from "../components/seller/DashboardCards";
import SearchFilters from "../components/seller/SearchFilters";
import TopProducts from "../components/seller/TopProducts";
import LowStockProducts from "../components/seller/LowStockProducts";
import SellerOrders from "../components/seller/SellerOrders";
import OrderModal from "../components/seller/OrderModal";
import SalesAnalytics from "../components/seller/SalesAnalytics";

function SellerDashboard() {
  const { user } = useContext(AuthContext);

  const { categories } =
    useContext(CategoryContext);

  const {
    products,
    addProduct,
    deleteProduct,
    editProduct,
    updateProduct,
    editingProduct,
  } = useContext(ProductContext);

  const {
    orders,
    updateOrderStatus,
  } = useContext(OrderContext);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [showOrderModal, setShowOrderModal] =
    useState(false);

  // ===============================
  // Seller Products
  // ===============================

  const sellerProducts = products
    .filter(
      (product) =>
        product.sellerId === user?.uid
    )
    .filter((product) => {
      const matchSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      return (
        matchSearch && matchCategory
      );
    });

  // ===============================
  // Seller Orders
  // ===============================

  const sellerOrders = orders
    .filter((order) =>
      order.items?.some(
        (item) =>
          item.sellerId === user?.uid
      )
    )
    .filter((order) => {
      const matchSearch =
        order.orderId
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchSearch && matchStatus
      );
    });

  // ===============================
  // Dashboard Stats
  // ===============================

  const totalProducts =
    sellerProducts.length;

  const totalOrders =
    sellerOrders.length;

  const deliveredOrders =
    sellerOrders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;

  const totalRevenue =
    sellerOrders
      .filter(
        (order) =>
          order.status === "Delivered"
      )
      .reduce(
        (sum, order) =>
          sum +
          Number(order.total || 0),
        0
      );

  const totalStock =
    sellerProducts.reduce(
      (sum, product) =>
        sum +
        Number(product.stock || 0),
      0
    );

  const averagePrice =
    totalProducts > 0
      ? Math.round(
          sellerProducts.reduce(
            (sum, product) =>
              sum +
              Number(product.price || 0),
            0
          ) / totalProducts
        )
      : 0;

  const topProducts = [...sellerProducts]
    .sort(
      (a, b) =>
        Number(b.sold || 0) -
        Number(a.sold || 0)
    )
    .slice(0, 5);

  const lowStockProducts =
    sellerProducts.filter(
      (product) =>
        Number(product.stock || 0) <= 10
    );
      // ===============================
  // UI
  // ===============================

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        🏪 Seller Dashboard
      </h1>

      <DashboardCards
        totalProducts={totalProducts}
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
        deliveredOrders={deliveredOrders}
        totalStock={totalStock}
        averagePrice={averagePrice}
      />

      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 0",
  }}
>
  <ExportOrdersExcel orders={sellerOrders} />
</div>

      <SearchFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categories={categories}
      />

      <AddProductForm
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        editingProduct={editingProduct}
      />

      <hr
        style={{
          margin: "35px 0",
        }}
      />

      <SellerProductList
        products={sellerProducts}
        onDelete={deleteProduct}
        onEdit={editProduct}
      />

      <TopProducts
        products={topProducts}
      />

      <LowStockProducts
        products={lowStockProducts}
      />

      <SalesAnalytics
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        deliveredOrders={deliveredOrders}
        totalProducts={totalProducts}
        totalStock={totalStock}
        averagePrice={averagePrice}
      />
            <SellerOrders
        sellerOrders={sellerOrders}
        user={user}
        updateOrderStatus={updateOrderStatus}
        setSelectedOrder={setSelectedOrder}
        setShowOrderModal={setShowOrderModal}
      />

      <OrderModal
        showOrderModal={showOrderModal}
        selectedOrder={selectedOrder}
        setShowOrderModal={setShowOrderModal}
      />
    </div>
  );
}

export default SellerDashboard;