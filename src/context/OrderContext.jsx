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

import { db, auth } from "../firebase";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

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

  // ==========================
  // Place Order
  // ==========================
  const placeOrder = async (order) => {
    const currentUser = auth.currentUser;

    const newOrder = {
      orderId: "BS-" + Date.now().toString().slice(-6),

      buyerId: currentUser?.uid || "",
      buyerEmail: currentUser?.email || "",

      sellerId:
        order.items?.length > 0
          ? order.items[0].sellerId || ""
          : "",

      sellerEmail:
        order.items?.length > 0
          ? order.items[0].sellerEmail || ""
          : "",

      deliveryBoyId: "",
      deliveryBoyName: "",

      customer: order.customer,
      mobile: order.mobile,
      address: order.address,
      city: order.city,
      pincode: order.pincode,

      payment: order.payment,
      paymentStatus: "Pending",

      total: order.total,

      items: order.items,

      status: "Order Placed",

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
      updatedAt: serverTimestamp(),
    };

    await addDoc(
      collection(db, "orders"),
      newOrder
    );
  };
    // ==========================
  // Update Order Status
  // ==========================
  const updateOrderStatus = async (id, status) => {
    if (status === "Cancelled") {
      await updateDoc(doc(db, "orders", id), {
        status: "Cancelled",
        paymentStatus: "Refund Pending",

        trackingSteps: [
          {
            title: "Order Cancelled",
            completed: true,
          },
        ],

        updatedAt: serverTimestamp(),
      });

      return;
    }

    const steps = [
      "Order Placed",
      "Packed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
    ];

    const currentIndex = steps.indexOf(status);

    const trackingSteps = steps.map((step, index) => ({
      title: step,
      completed: index <= currentIndex,
    }));

    await updateDoc(doc(db, "orders", id), {
      status,

      paymentStatus:
        status === "Delivered"
          ? "Paid"
          : "Pending",

      trackingSteps,

      updatedAt: serverTimestamp(),
    });
  };

  // ==========================
  // Assign Delivery Boy
  // ==========================
  const assignDeliveryBoy = async (
    orderId,
    deliveryBoyId,
    deliveryBoyName
  ) => {
    await updateDoc(doc(db, "orders", orderId), {
      deliveryBoyId,
      deliveryBoyName,
      updatedAt: serverTimestamp(),
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        assignDeliveryBoy,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;