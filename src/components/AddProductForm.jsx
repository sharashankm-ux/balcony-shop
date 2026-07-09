import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

function AddProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
}) {
  const {
    categories,
    addCategory,
  } = useContext(CategoryContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [newCategory, setNewCategory] =
    useState("");

  const [showNewCategory, setShowNewCategory] =
    useState(false);

  const [imageFile, setImageFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setPrice(editingProduct.price || "");
      setCategory(editingProduct.category || "");
      setPreview(editingProduct.image || "");
    } else {
      setName("");
      setPrice("");

      if (categories.length > 0) {
        setCategory(categories[0].name);
      } else {
        setCategory("");
      }

      setPreview("");
      setImageFile(null);
      setNewCategory("");
      setShowNewCategory(false);
    }
  }, [editingProduct, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalCategory = category;

    if (showNewCategory) {
      if (!newCategory.trim()) {
        alert("Enter Category Name");
        return;
      }

      finalCategory = newCategory;

      if (addCategory) {
  await addCategory(newCategory);
}
    }

    if (!name || !price || !finalCategory) {
      alert("Please fill all fields");
      return;
    }

    let imageUrl =
      editingProduct?.image ||
      "https://via.placeholder.com/300";

    if (imageFile) {
      const formData = new FormData();

      formData.append("file", imageFile);

      formData.append(
        "upload_preset",
        "balconyshop"
      );

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/un8w54fs/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data =
          await response.json();

        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          alert("Image Upload Failed");
          return;
        }
      } catch (err) {
        console.log(err);
        alert("Cloudinary Error");
        return;
      }
    } 
          const product = {
      name,
      price: Number(price),
      category: finalCategory,
      image: imageUrl,
    };

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...product,
      });

      alert("✅ Product Updated");
    } else {
      onAddProduct(product);

      alert("✅ Product Added");
    }

    setName("");
    setPrice("");
    setImageFile(null);
    setPreview("");
    setNewCategory("");
    setShowNewCategory(false);

    if (categories.length > 0) {
      setCategory(categories[0].name);
    }
  };

  return (
    <div
      style={{
        marginBottom: "30px",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.12)",
      }}
    >
      <h2
        style={{
          background: "#2e7d32",
          color: "#fff",
          padding: "15px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {editingProduct
          ? "✏️ Edit Product"
          : "➕ Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.name}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() =>
            setShowNewCategory(
              !showNewCategory
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ➕ Create New Category
        </button>

        {showNewCategory && (
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategory}
            onChange={(e) =>
              setNewCategory(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
            }}
          />
        )}

        <h3>📷 Upload Product Image</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            setImageFile(file);

            if (file) {
              setPreview(
                URL.createObjectURL(file)
              );
            }
          }}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              display: "block",
              margin: "15px auto",
              borderRadius: "12px",
            }}
          />
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: editingProduct
              ? "#ff9800"
              : "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProductForm;