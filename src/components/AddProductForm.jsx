import { useState, useEffect } from "react";

function AddProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Plants");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Please fill all fields");
      return;
    }

    let imageUrl = editingProduct?.image || "https://via.placeholder.com/150";

    // Upload image to Cloudinary
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "balconyshop");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/un8w54fs/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          alert("Image upload failed!");
          return;
        }
      } catch (error) {
        console.error(error);
        alert("Cloudinary upload failed!");
        return;
      }
    }

    const productData = {
      name,
      price: Number(price),
      category,
      image: imageUrl,
    };

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productData,
      });

      alert("✅ Product Updated Successfully!");
    } else {
      onAddProduct(productData);

      alert("✅ Product Added Successfully!");
    }

    setName("");
    setPrice("");
    setCategory("Plants");
    setImageFile(null);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>
        {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option>Plants</option>
          <option>Pots</option>
          <option>Furniture</option>
          <option>Lighting</option>
          <option>Decoration</option>
          <option>Tools</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: editingProduct ? "#ff9800" : "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;