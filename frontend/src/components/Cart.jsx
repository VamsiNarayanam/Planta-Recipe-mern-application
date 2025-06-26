import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    try {

      const options = {
        key: "rzp_test_R4UHun3Y7fdmgD",
        amount: total * 100,
        currency: "INR",
        name: "Recipe store",
        description: "Payment for Order",
        handler: async function (response) {
          console.log("Payment successful", response);

          await axios.post("https://planta-recipe-mern-application.vercel.app/payment", { amount: total });

          setPaymentSuccess(true);
          setTimeout(() => navigate("/rating"), 3000);
        },
        prefill: {
          name: "vamsi narayanam",
          email: "vamikrish.rock@gmail.com",
          contact: "9582908655",
        },
        notes: {
          address: "dwarka sector-7",
        },
        theme: {
          color: "#F37254",
        },
      };


      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      alert("Payment failed. Try again!");
    }
  };

  return (
    <div className="container">
      <h2>ORDERED RECIPES</h2>
      {cart.length === 0 ? (
        <p id="empty">🛒 EMPTY ORDERED ITEMS</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <p>{item.name} - ₹{item.price}</p>
              <button className="btn" onClick={() => removeFromCart(index)}>REMOVE</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ₹{total}</h3>
      {cart.length > 0 && (
        <div className="payment-container">
          <button className="btn" onClick={handlePayment}>Pay</button>
          {paymentSuccess && <div className="payment-success">✅ Payment Successful!</div>}
        </div>
      )}
    </div>
  );
};

export default Cart;
