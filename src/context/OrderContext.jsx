import { createContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] =useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(orderList);
    });

    return () => unsubscribe();
  }, []);

  const placeOrder = async (order) => {
    const newOrder = {
      orderId:
        "BS-" +
        Date.now().toString().slice(-6),

      ...order,

      status: "Order Placed",

      paymentStatus: "Pending",

      trackingSteps: [
        {
          title: "Order Placed",
          completed: true,
        },
        {
          title: "Packed",
          completed: false,
        },
        {
          title: "Shipped",
          completed: false,
        },
        {
          title: "Out For Delivery",
          completed: false,
        },
        {
          title: "Delivered",
          completed: false,
        },
      ],

      createdAt: serverTimestamp(),
    };

    await addDoc(
      collection(db, "orders"),
      newOrder
    );
  };

  const updateOrderStatus = async (
    id,
    status
  ) => {
    const steps = [
      "Order Placed",
      "Packed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
    ];

    const currentIndex =
      steps.indexOf(status);

    const trackingSteps = steps.map(
      (step, index) => ({
        title: step,
        completed: index <= currentIndex,
      })
    );

    await updateDoc(doc(db, "orders", id), {
      status,
      trackingSteps,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;