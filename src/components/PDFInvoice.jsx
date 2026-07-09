import jsPDF from "jspdf";

function PDFInvoice({ order }) {
  const downloadPDF = () => {
    if (!order) return;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(20);
    pdf.text("Balcony Shop Invoice", 20, y);

    y += 15;

    pdf.setFontSize(12);

    pdf.text(`Order ID : ${order.orderId}`, 20, y);
    y += 10;

    pdf.text(`Customer : ${order.customer}`, 20, y);
    y += 10;

    pdf.text(`Mobile : ${order.mobile}`, 20, y);
    y += 10;

    pdf.text(`Payment : ${order.payment}`, 20, y);
    y += 10;

    pdf.text(`Status : ${order.status}`, 20, y);
    y += 10;

    pdf.text(`Total : Rs. ${order.total}`, 20, y);

    y += 20;

    pdf.setFontSize(15);
    pdf.text("Products", 20, y);

    y += 10;

    order.items?.forEach((item) => {
      pdf.setFontSize(12);

      pdf.text(
        `${item.productName} | Qty: ${item.quantity} | Rs.${item.price}`,
        20,
        y
      );

      y += 10;
    });

    pdf.save(`Invoice-${order.orderId}.pdf`);
  };

  return (
    <button
      onClick={downloadPDF}
      style={{
        background: "#4caf50",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      📄 Download Invoice
    </button>
  );
}

export default PDFInvoice;