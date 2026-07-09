import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg,#1b5e20,#43a047)",
          color: "#fff",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "20px",
          }}
        >
          🌿 Balcony Shop
        </h1>

        <p
          style={{
            fontSize: "22px",
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "1.7",
          }}
        >
          Buy Plants, Pots, Furniture, Decoration, Lighting & Gardening
          Accessories at the Best Prices.
        </p>

        <Link to="/products">
          <button
            style={{
              marginTop: "35px",
              padding: "16px 40px",
              border: "none",
              borderRadius: "10px",
              background: "#ffeb3b",
              color: "#222",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            🛍 Shop Now
          </button>
        </Link>
      </section>

      {/* Categories */}
      <section
        style={{
          padding: "50px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🪴 Shop By Category
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {[
            "🌱 Plants",
            "🪴 Pots",
            "🪑 Furniture",
            "💡 Lighting",
            "🎍 Decoration",
            "🛠 Tools",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "#fff",
                padding: "35px",
                textAlign: "center",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.1)",
                cursor: "pointer",
              }}
            >
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          background: "#fff",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          ⭐ Why Choose Balcony Shop?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h3>🚚 Fast Delivery</h3>
            <p>Quick and safe doorstep delivery.</p>
          </div>

          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h3>💳 Secure Payment</h3>
            <p>Safe online payment experience.</p>
          </div>

          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h3>⭐ Best Quality</h3>
            <p>Premium quality products.</p>
          </div>

          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h3>📞 24×7 Support</h3>
            <p>Always here to help our customers.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#1b5e20",
          color: "#fff",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <h3>🌿 Balcony Shop</h3>

        <p>© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;