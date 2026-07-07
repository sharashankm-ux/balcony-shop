import { createContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    await addDoc(collection(db, "products"), product);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  const updateProduct = async (updatedProduct) => {
    const { id, ...data } = updatedProduct;

    await updateDoc(doc(db, "products", id), data);

    setEditingProduct(null);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        editProduct,
        updateProduct,
        editingProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;