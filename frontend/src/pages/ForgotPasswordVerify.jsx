import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ForgotPasswordVerify = () => {
  const [otp, setOtp] = useState("");
  const { forgotVerifyOtp, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) return;
    clearError();
    const res = await forgotVerifyOtp(email, otp);
    if (res.success) {
      navigate("/forgot-password/reset", { state: { email } });
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

          <h5 className="text-2xl font-bold mb-1">Enter OTP</h5>
          <p className="text-sm text-gray-500 mb-1">We sent a 6-digit OTP to</p>
          <p className="text-sm font-semibold text-[#0A0F1C] mb-6">{email}</p>

          {error && <p className="text-red-500 text-xs mb-4 bg-red-50 p-2 rounded">{error}</p>}

          <input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-center tracking-widest  outline-none focus:ring-2 focus:ring-[#0A0F1C]"
          />

          <button
            onClick={handleSubmit}
            disabled={loading || otp.length !== 6}
            className="w-full mt-4 p-2.5 bg-[#0A0F1C] text-white rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Didn't receive it?{" "}
            <button onClick={() => navigate("/forgot-password")} className="text-[#0A0F1C] font-semibold hover:underline">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordVerify;