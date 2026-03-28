import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");
  const { resetPassword, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async () => {
    setLocalError("");
    clearError();
    if (newPassword.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirm) {
      setLocalError("Passwords do not match.");
      return;
    }
    const res = await resetPassword(email, newPassword);
    if (res.success) {
      navigate("/login", { state: { message: "Password reset! Please login." } });
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

          <h5 className="text-2xl font-bold mb-1">Reset Password</h5>
          <p className="text-sm text-gray-500 mb-6">Choose a strong new password for your account.</p>

          {(error || localError) && (
            <p className="text-red-500 text-xs mb-4 bg-red-50 p-2 rounded">{localError || error}</p>
          )}

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C]"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-md text-sm mt-3 outline-none focus:ring-2 focus:ring-[#0A0F1C]"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 p-2.5 bg-[#0A0F1C] text-white rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;