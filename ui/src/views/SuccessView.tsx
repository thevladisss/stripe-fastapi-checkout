import { useNavigate } from "react-router-dom";
import "./SuccessView.css";

export function SuccessView() {
  const navigate = useNavigate();

  return (
    <div className="success-view">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l2.5 2.5L16 9" />
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <button className="success-button" onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

