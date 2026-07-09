import { createContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

export const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("CategoryProvider Started");

    const unsubscribe = onSnapshot(
      collection(db, "categories"),

      (snapshot) => {
        console.log("Total Category Docs:", snapshot.size);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || doc.data().Name || "",
        }));

        console.log("Category List:", list);

        setCategories(list);
      },

      (error) => {
        console.error("Firestore Category Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // ✅ Add Category (Supports both string & object)
  const addCategory = async (category) => {
    const name =
      typeof category === "string"
        ? category
        : category?.name || "";

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    // Duplicate category check
    const exists = categories.some(
      (item) =>
        item.name.toLowerCase() ===
        name.trim().toLowerCase()
    );

    if (exists) {
      alert("Category already exists");
      return;
    }

    await addDoc(collection(db, "categories"), {
      name: name.trim(),
    });
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;