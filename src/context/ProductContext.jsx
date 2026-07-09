import { createContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";

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
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    const currentUser = auth.currentUser;

    const newProduct = {
      ...product,
      sellerId: currentUser?.uid || "",
      sellerEmail: currentUser?.email || "",

      stock: Number(product.stock || 100),
      status: "Active",

      views: 0,
      sold: 0,

      rating: 0,
      totalReviews: 0,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "products"), newProduct);
  };
    const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  const updateProduct = async (updatedProduct) => {
    const { id, ...data } = updatedProduct;

    await updateDoc(doc(db, "products", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });

    setEditingProduct(null);
  };

  const reduceStock = async (items) => {
    try {
      for (const item of items) {
        const productRef = doc(db, "products", item.id);

        const snap = await getDoc(productRef);

        if (!snap.exists()) continue;

        const product = snap.data();

        const currentStock = Number(product.stock || 0);
        const qty = Number(item.quantity || 1);

        const newStock = Math.max(currentStock - qty, 0);

        await updateDoc(productRef, {
          stock: newStock,
          sold: (product.sold || 0) + qty,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
    }
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
        reduceStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;