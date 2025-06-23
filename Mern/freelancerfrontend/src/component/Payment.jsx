import { useState } from "react";
import "../styles/Payment.css";

const NewPaymentPage = ({ selectedPackage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const updatePaymentMethod = (method) => {
    setSelectedMethod(method);
    setCardDetails({ number: "", expiry: "", cvv: "" });
    setUpiId("");
  };

  const handleCardInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus(Math.random() > 0.3);
      setCurrentStep(4);
    }, 2000);
  };

  return (
    <section className="payment-section">
      <div className="payment-wrapper">
       
        <div className="payment-container">
          <h2>Checkout Payment</h2>

          {currentStep === 1 && (
            <div className="step-container">
              <h3>Select Payment Option</h3>
              <div className="payment-methods">
                <button className={selectedMethod === "card" ? "active" : ""} onClick={() => updatePaymentMethod("card")}>
                  💳 Card Payment
                </button>
                <button className={selectedMethod === "upi" ? "active" : ""} onClick={() => updatePaymentMethod("upi")}>
                  📲 UPI Payment
                </button>
                <button className={selectedMethod === "netbanking" ? "active" : ""} onClick={() => updatePaymentMethod("netbanking")}>
                  🏦 Net Banking
                </button>
              </div>
              <button className="next-btn" onClick={() => setCurrentStep(2)}>Continue →</button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-container">
              <h3>Enter Payment Details</h3>
              {selectedMethod === "card" && (
                <div className="input-container">
                  <input type="text" name="number" placeholder="Enter Card Number" maxLength="16" value={cardDetails.number} onChange={handleCardInputChange} />
                  <input type="text" name="expiry" placeholder="MM/YY" maxLength="5" value={cardDetails.expiry} onChange={handleCardInputChange} />
                  <input type="text" name="cvv" placeholder="CVV" maxLength="3" value={cardDetails.cvv} onChange={handleCardInputChange} />
                </div>
              )}
              {selectedMethod === "upi" && (
                <input type="text" className="upi-input" placeholder="Enter UPI ID (example@upi)" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
              )}
              <button className="next-btn" onClick={() => setCurrentStep(3)}>Review & Confirm →</button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-container">
              <h3>Confirm Your Payment</h3>
              <p>Payment Mode: <strong>{selectedMethod.toUpperCase()}</strong></p>
              {selectedMethod === "card" && <p>Card: **** **** **** {cardDetails.number.slice(-4)}</p>}
              {selectedMethod === "upi" && <p>UPI ID: {upiId}</p>}
              <button className="pay-btn" onClick={processPayment}>Make Payment</button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-container">
              {isProcessing ? (
                <p className="processing-text">Processing Your Payment...</p>
              ) : paymentStatus ? (
                <p className="success-text">✅ Payment Completed Successfully!</p>
              ) : (
                <p className="failed-text">❌ Payment Failed! Try Again.</p>
              )}
            </div>
          )}
        </div>

        <div className="package-container">
          <h3>Selected Package</h3>
          {selectedPackage ? (
            <div className="package-box">
              <h4>{selectedPackage.name}</h4>
              <p>{selectedPackage.description}</p>
              <strong>Price: ${selectedPackage.price}</strong>
            </div>
          ) : (
            <p>No package selected.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewPaymentPage;
