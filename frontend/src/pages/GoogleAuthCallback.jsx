import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/authStore";

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setGoogleAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const userRaw = searchParams.get("user");

    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw);
        setGoogleAuth(token, user); // store in Zustand
        navigate("/", { replace: true });
      } catch {
        navigate("/login?error=google_failed", { replace: true });
      }
    } else {
      navigate("/login?error=google_failed", { replace: true });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Signing you in with Google...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;