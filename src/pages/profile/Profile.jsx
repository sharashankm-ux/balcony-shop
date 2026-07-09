import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { db } from "../../firebase";
import CloudinaryUpload from "../../components/CloudinaryUpload";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setName(data.name || "");
          setMobile(data.mobile || "");
          setAddress(data.address || "");
          setCity(data.city || "");
          setState(data.state || "");
          setPincode(data.pincode || "");
          setPhoto(data.photo || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please Login First");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name,
        mobile,
        address,
        city,
        state,
        pincode,
        photo,
        profileCompleted: true,
      });

      alert("✅ Profile Saved Successfully");

      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      switch (userData.role) {
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
      console.error(error);
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        background: "#fff",
        padding: "35px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.15)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        {photo ? (
  <img
    src={photo}
    alt="Profile"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 15px",
      display: "block",
      border: "4px solid #2e7d32",
    }}
  />
) : (
  <div
    style={{
      width: "120px",
      height: "120px",
      margin: "0 auto 15px",
      borderRadius: "50%",
      background: "#2e7d32",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "45px",
      fontWeight: "bold",
    }}
  >
    {name ? name.charAt(0).toUpperCase() : "👤"}
  </div>
)}

        <CloudinaryUpload onUpload={setPhoto} />

        <h2>My Profile</h2>

        <p style={{ color: "#777" }}>
          {user?.email}
        </p>
      </div>

      <form onSubmit={handleSave}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={inputStyle}
          required
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={textAreaStyle}
          required
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "17px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Saving..." : "💾 Save Profile"}
        </button>

      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box",
};

const textAreaStyle = {
  ...inputStyle,
  height: "90px",
};

export default Profile;