import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { auth, db } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      let userCredential;

      try {
        // Existing user login
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch {
        // New user signup
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const userRef = doc(db, "users", userCredential.user.uid);

      let userRole = role;

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: userCredential.user.email,
          role,
          createdAt: new Date().toISOString(),
        });
      } else {
        userRole = userSnap.data().role;
      }

      login({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        role: userRole,
      });

      alert("✅ Login Successful!");

      switch (userRole) {
        case "buyer":
          navigate("/buyer");
          break;

        case "seller":
          navigate("/seller");
          break;

        case "admin":
          navigate("/admin");
          break;

        case "delivery":
          navigate("/delivery");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "25px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🔐 Login
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <option value="buyer">👤 Buyer</option>
          <option value="seller">🏪 Seller</option>
          <option value="admin">👨‍💼 Admin</option>
          <option value="delivery">🚚 Delivery</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;