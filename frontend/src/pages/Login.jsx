import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import googleIcon from "../assests/googleIcon.png";
import CharacterIcon from "../assests/ladyCharacter.png";
import DeviceIcon from "../assests/keyDevice.png";
import PlantIcon from "../assests/Leaves.png";
import floorIcon from "../assests/Floor.png";
import useAuthStore from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.message || "";

  const handleLogin = async () => {
    clearError();
    const res = await login(email, password);
    if (res.success) {
      navigate(location.state?.from?.pathname || "/");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
     

      <div className="flex-1 w-full flex flex-col md:flex-row md:justify-evenly items-center p-8 gap-8">
        <div className="w-full max-w-sm p-4">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-7 h-7 rounded-full bg-[#0A0F1C] flex justify-center items-center font-semibold text-white text-lg">C</div>
            <span className="font-semibold text-[#0A0F1C] group-hover:underline">ocolaw.ai</span>
          </Link>

          <h5 className="text-2xl font-medium">Welcome Back</h5>
          <p className="text-sm text-gray-500 mb-4">Schedule your appointment and get expert advice</p>

          {successMsg && <p className="text-green-600 text-xs mb-3 bg-green-50 p-2 rounded">{successMsg}</p>}
          {error && <p className="text-red-500 text-xs mb-3 bg-red-50 p-2 rounded">{error}</p>}

          <input
            type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md text-sm mt-2 outline-none focus:ring-2 focus:ring-[#0A0F1C]"
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-300 p-2 rounded-md text-sm mt-3 outline-none focus:ring-2 focus:ring-[#0A0F1C]"
          />

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-[#0A0F1C] font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleLogin} disabled={loading}
            className="w-full mt-4 p-2 bg-[#0A0F1C] text-white rounded-md hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center my-4">
            <div className="grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or Continue</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-50 transition">
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>

          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#0A0F1C] font-semibold hover:underline">Register here</Link>
          </p>
        </div>

        <div className="hidden md:flex flex-col items-center">
          <div className="flex items-end">
            <img className="w-32 h-64 relative z-10" src={CharacterIcon} alt="" />
            <img className="w-40 h-80 relative z-10" src={DeviceIcon} alt="" />
            <img className="w-24 h-48 -ml-10 relative z-5" src={PlantIcon} alt="" />
          </div>
          <img className="w-80 -mt-3" src={floorIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;