import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import { useState } from 'react';
import SignUp from './pages/SignUp';
import { useLocation } from "react-router-dom";
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import Appointments from './pages/Appointments';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordVerify from './pages/ForgotPasswordVerify';
import ResetPassword from './pages/ResetPassword';
import PublicRoute from './guards/PublicRoute';
import GoogleAuthCallback from './pages/GoogleAuthCallback';
const hideLayouts = [
  "/login", "/signup",
  "/forgot-password", "/forgot-password/verify", "/forgot-password/reset",
  "/auth/google/callback"  
];

function App() {

  //toggle state for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); //get current location

  //boolean state for hiding
  const hideLayout = hideLayouts.includes(location.pathname);

  return (
    <>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        {!hideLayout && (<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />)}

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          {!hideLayout && (<Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />)}

          {/* Pages */}
          <div className={`${hideLayout ? "w-full h-screen" : "flex-1 p-4 bg-gray-50"}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/forgot-password/verify" element={<PublicRoute><ForgotPasswordVerify /></PublicRoute>} />
              <Route path="/forgot-password/reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />   
              <Route path="/profile" element={<Profile />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/services" element={<Services />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
