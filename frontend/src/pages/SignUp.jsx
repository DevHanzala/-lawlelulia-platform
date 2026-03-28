import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assests/googleIcon.png";
import CharacterIcon from "../assests/Character.png";
import DeviceIcon from "../assests/Device.png";
import PlantIcon from "../assests/Plant.png";
import ShadowIcon from "../assests/Shadow.png";
import useAuthStore from "../store/authStore";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");

  const { signupSendOtp, signupVerifyOtp, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLocalError("");
    clearError();
    if (!fullName || !email || !password) { setLocalError("All fields are required."); return; }
    if (password.length < 8) { setLocalError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setLocalError("Passwords do not match."); return; }

    const res = await signupSendOtp(fullName, email, password);
    if (res.success) setStep(2);
  };

  const handleVerifyOtp = async () => {
    setLocalError("");
    clearError();
    if (otp.length !== 6) { setLocalError("Please enter a valid 6-digit OTP."); return; }

    const res = await signupVerifyOtp(email, otp);
    if (res.success) {
      navigate("/login", { state: { message: "Account verified! Please login." } });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };


  const displayError = localError || error;

  return (
    <div className="w-full min-h-screen flex flex-col">


      <div className="flex-1 w-full flex flex-col md:flex-row md:justify-evenly items-center p-8 gap-8">
        <div className="w-full max-w-sm p-4">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-7 h-7 rounded-full bg-[#0A0F1C] flex justify-center items-center font-semibold text-white text-lg">C</div>
            <span className="font-semibold text-[#0A0F1C] group-hover:underline">ocolaw.ai</span>
          </Link>

          {step === 1 ? (
            <>
              <h5 className="text-2xl font-medium">Create Your Account</h5>
              <p className="text-sm text-gray-500 mb-4">Join CoCoLaw.ai and get expert legal guidance today</p>

              {displayError && <p className="text-red-500 text-xs mb-3 bg-red-50 p-2 rounded">{displayError}</p>}

              <input type="text" placeholder="Full Name" value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md text-sm mt-2 outline-none focus:ring-2 focus:ring-[#0A0F1C]" />
              <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md text-sm mt-3 outline-none focus:ring-2 focus:ring-[#0A0F1C]" />
              <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md text-sm mt-3 outline-none focus:ring-2 focus:ring-[#0A0F1C]" />
              <input type="password" placeholder="Confirm Password" value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md text-sm mt-3 outline-none focus:ring-2 focus:ring-[#0A0F1C]" />

              <label className="flex items-center gap-2 text-xs mt-3">
                <input type="checkbox" className="cursor-pointer" />
                I agree to the Terms & Conditions
              </label>

              <button onClick={handleSendOtp} disabled={loading}
                className="w-full mt-4 p-2 bg-[#0A0F1C] text-white rounded-md hover:bg-gray-800 transition disabled:opacity-60">
                {loading ? "Sending OTP..." : "Create Account"}
              </button>
            </>
          ) : (
            <>
              <h5 className="text-2xl font-medium">Verify Your Email</h5>
              <p className="text-sm text-gray-500 mb-1">We sent a 6-digit OTP to</p>
              <p className="text-sm font-semibold text-[#0A0F1C] mb-4">{email}</p>

              {displayError && <p className="text-red-500 text-xs mb-3 bg-red-50 p-2 rounded">{displayError}</p>}

              <input type="text" placeholder="6-digit OTP" value={otp} maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-gray-300 p-2.5 rounded-md text-sm text-center tracking-widest  outline-none focus:ring-2 focus:ring-[#0A0F1C]" />

              <button onClick={handleVerifyOtp} disabled={loading || otp.length !== 6}
                className="w-full mt-4 p-2 bg-[#0A0F1C] text-white rounded-md hover:bg-gray-800 transition disabled:opacity-60">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button onClick={() => { setStep(1); clearError(); setLocalError(""); }}
                className="w-full mt-2 p-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition">
                ← Go Back
              </button>

              <p className="mt-3 text-xs text-gray-500 text-center">
                Didn't receive it?{" "}
                <button onClick={() => signupSendOtp(fullName, email, password)} className="text-[#0A0F1C] font-semibold hover:underline">
                  Resend OTP
                </button>
              </p>
            </>
          )}

          <div className="flex items-center my-4">
            <div className="grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or Continue</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-50 transition"
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0A0F1C] font-semibold hover:underline">Login here</Link>
          </p>
        </div>

        <div className="hidden md:flex flex-col items-center">
          <div className="flex items-end">
            <img className="w-20 h-64 relative z-10" src={CharacterIcon} alt="" />
            <img className="w-40 h-72 relative z-10" src={DeviceIcon} alt="" />
            <img className="w-24 h-48 -ml-6 relative z-10" src={PlantIcon} alt="" />
          </div>
          <img className="w-72 -mt-2" src={ShadowIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;