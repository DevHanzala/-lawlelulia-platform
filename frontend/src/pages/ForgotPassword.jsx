import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotSendOtp, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) return;
    clearError();
    const res = await forgotSendOtp(email);
    if (res.success) {
      navigate("/forgot-password/verify", { state: { email } });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
     

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-sm">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-7 h-7 rounded-full bg-[#0A0F1C] flex justify-center items-center font-semibold text-white text-lg">C</div>
            <span className="font-semibold text-[#0A0F1C] group-hover:underline">ocolaw.ai</span>
          </Link>

          <h5 className="text-2xl font-bold mb-1">Forgot Password?</h5>
          <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send you an OTP to reset your password.</p>

          {error && <p className="text-red-500 text-xs mb-4 bg-red-50 p-2 rounded">{error}</p>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C]"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 p-2.5 bg-[#0A0F1C] text-white rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p className="mt-4 text-sm text-center">
            Remember your password?{" "}
            <Link to="/login" className="text-[#0A0F1C] font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;