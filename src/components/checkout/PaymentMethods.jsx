function PaymentMethods({ payment, setPayment }) {
  const methods = [
    {
      title: "Cash on Delivery",
      icon: "💵",
      desc: "Pay after delivery",
    },
    {
      title: "UPI",
      icon: "📱",
      desc: "Google Pay / PhonePe / Paytm",
    },
    {
      title: "Credit Card",
      icon: "💳",
      desc: "Visa / MasterCard",
    },
    {
      title: "Debit Card",
      icon: "🏦",
      desc: "ATM Debit Card",
    },
  ];

  return (
    <div style={{ marginTop: "30px" }}>
      <h2
        style={{
          marginBottom: "20px",
          color: "#222",
        }}
      >
        💳 Select Payment Method
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >
        {methods.map((method) => (
          <div
            key={method.title}
            onClick={() => setPayment(method.title)}
            style={{
              cursor: "pointer",
              padding: "20px",
              borderRadius: "12px",
              transition: ".3s",

              border:
                payment === method.title
                  ? "3px solid #2e7d32"
                  : "2px solid #ddd",

              background:
                payment === method.title
                  ? "#e8f5e9"
                  : "#fff",

              boxShadow:
                payment === method.title
                  ? "0 8px 18px rgba(46,125,50,.2)"
                  : "0 3px 10px rgba(0,0,0,.08)",
            }}
          >
            <h1>{method.icon}</h1>

            <h3>{method.title}</h3>

            <p
              style={{
                color: "#666",
                fontSize: "14px",
              }}
            >
              {method.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;