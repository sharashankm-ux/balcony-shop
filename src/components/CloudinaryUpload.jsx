import { useState } from "react";

const CLOUD_NAME = "un8w54fs";
const UPLOAD_PRESET = "balconyshop";

function CloudinaryUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        onUpload(data.secure_url);
      } else {
        console.error(data);
        alert("❌ Image Upload Failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Upload Error");
    }

    setUploading(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p style={{ color: "green", marginTop: "10px" }}>
          ⏳ Uploading Image...
        </p>
      )}
    </div>
  );
}

export default CloudinaryUpload;