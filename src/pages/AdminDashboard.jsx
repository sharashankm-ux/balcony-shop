import AdminStats from "../components/AdminStats";
import RecentOrders from "../components/RecentOrders";
import SalesChart from "../components/SalesChart";
import AdminProductTable from "../components/AdminProductTable";

function AdminDashboard() {
  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          color: "#222",
        }}
      >
        👨‍💼 Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <AdminStats />

      {/* Dashboard Overview */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
          marginTop: "20px",
        }}
      >
        <h2>📊 Dashboard Overview</h2>

        <p
          style={{
            color: "#555",
            lineHeight: "1.8",
          }}
        >
          Welcome Admin 👋
          <br />
          Manage Products, Orders, Users, Delivery Partners and monitor your
          business performance from here.
        </p>
      </div>

      {/* Recent Orders */}
      <RecentOrders />

      {/* Monthly Sales */}
      <SalesChart />

      {/* Product Management */}
      <AdminProductTable />
    </div>
  );
}

export default AdminDashboard;