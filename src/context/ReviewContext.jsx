import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export const ReviewContext = createContext();

function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  const addReview = async (review) => {
    await addDoc(collection(db, "reviews"), {
      ...review,
      createdAt: serverTimestamp(),
    });
  };

  const getProductReviews = (productId) => {
    return reviews.filter(
      (review) => review.productId === productId
    );
  };

  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);

    if (productReviews.length === 0) return 0;

    const total = productReviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return (
      total / productReviews.length
    ).toFixed(1);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewProvider;