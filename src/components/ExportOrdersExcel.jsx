import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportOrdersExcel({ orders }) {
  const exportExcel = () => {
    if (!orders || orders.length === 0) {
      alert("No Orders Found");
      return;
    }

    const data = orders.map((order) => ({
      "Order ID": order.orderId,
      Customer: order.customer,
      Mobile: order.mobile,
      Email: order.buyerEmail,
      Payment: order.payment,
      Status: order.status,
      Total: order.total,
      City: order.city,
      Address: order.address,
      Pincode: order.pincode,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Orders"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "SellerOrders.xlsx");
  };

  return (
    <button
      onClick={exportExcel}
      style={{
        background: "#2e7d32",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      📊 Export Excel
    </button>
  );
}

export default ExportOrdersExcel;