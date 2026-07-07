import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/checkout.css";

import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentMethods from "../components/checkout/PaymentMethods";
import UpiPayment from "../components/checkout/UpiPayment";
import CardPayment from "../components/checkout/CardPayment";
import CouponBox from "../components/checkout/CouponBox";
import OrderSummary from "../components/checkout/OrderSummary";
import SavedAddress from "../components/checkout/SavedAddress";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("savedAddress");

    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          mobile: "",
          address: "",
          city: "",
          pincode: "",
        };
  });

  const [saveAddress, setSaveAddress] = useState(true);

  const [showForm, setShowForm] = useState(() => {
    return localStorage.getItem("savedAddress") ? false : true;
  });

  const [payment, setPayment] = useState("Cash on Delivery");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 999 ? 0 : 50;

  const gst = Math.round(subtotal * 0.18);

  const grandTotal = subtotal + delivery + gst - discount;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (
      !form.name ||
      !form.mobile ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    if (saveAddress) {
      localStorage.setItem(
        "savedAddress",
        JSON.stringify(form)
      );
    }

    placeOrder({
      customer: form.name,
      mobile: form.mobile,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      payment,
      total: grandTotal,
      items: cartItems,
    });

    clearCart();

    alert("✅ Order Placed Successfully!");

    navigate("/my-orders");
  };

  return (
    <div className="checkout-container">

      <h1 className="checkout-title">
        🛒 Secure Checkout
      </h1>

      {showForm ? (
        <CheckoutForm
          form={form}
          handleChange={handleChange}
          saveAddress={saveAddress}
          setSaveAddress={setSaveAddress}
        />
      ) : (
        <SavedAddress
          form={form}
          onChangeAddress={() => setShowForm(true)}
        />
      )}

      <PaymentMethods
        payment={payment}
        setPayment={setPayment}
      />

      {payment === "UPI" && (
        <UpiPayment
          upiId={upiId}
          setUpiId={setUpiId}
        />
      )}

      {payment === "Credit Card" && (
        <CardPayment
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardName={cardName}
          setCardName={setCardName}
          expiry={expiry}
          setExpiry={setExpiry}
          cvv={cvv}
          setCvv={setCvv}
        />
      )}

      <CouponBox
        subtotal={subtotal}
        setDiscount={setDiscount}
      />

      <OrderSummary
        cartItems={cartItems}
        subtotal={subtotal}
        delivery={delivery}
        gst={gst}
        discount={discount}
        grandTotal={grandTotal}
      />

      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
      >
        ✅ Place Order
      </button>

    </div>
  );
}

export default Checkout;