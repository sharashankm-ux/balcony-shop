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
  serverTimestamp,
} from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const redirectUser = (userRole) => {
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
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  console.log("🔥 Login Button Clicked");

  if (!email || !password) {
    alert("Please enter Email & Password");
    return;
  }

  try {
    let userCredential;

    try {
      console.log("🔵 Trying Login...");

      userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("✅ Existing User Login Success");
    } catch {
      console.log("🟡 User Not Found, Creating New User...");

      userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log("✅ New User Created");
    }

    const uid = userCredential.user.uid;

    console.log("UID :", uid);

    const userRef = doc(db, "users", uid);

    const userSnap = await getDoc(userRef);

    let userData;

    if (!userSnap.exists()) {

      console.log("🟢 Firestore User Document NOT Found");

      userData = {
        uid,
        email: userCredential.user.email,
        role,

        profileCompleted: false,

        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        photo: "",

        createdAt: serverTimestamp(),
      };

      console.log("📤 Saving Firestore User...");
      console.log(userData);

      await setDoc(userRef, userData);

      console.log("✅ Firestore Document Saved");

      const checkDoc = await getDoc(userRef);

      console.log("Document Exists :", checkDoc.exists());

      if (checkDoc.exists()) {
        console.log(checkDoc.data());
      }

    } else {

      console.log("🔵 Existing Firestore User");

      userData = userSnap.data();
    }

    login({
  uid,
  email: userData.email,
  role: userData.role,
});

alert("✅ Login Successful");

if (!userData.profileCompleted) {
  navigate("/profile");
} else {
  redirectUser(userData.role);
}

  } catch (error) {

    console.error("❌ LOGIN ERROR :", error);

    alert(error.message);
  }
};

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        padding: "25px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,.2)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        🔐 Login / Register
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
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
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default Login;