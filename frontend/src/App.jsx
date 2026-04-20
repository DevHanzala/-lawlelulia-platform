import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import { useState } from 'react';
import SignUp from './pages/SignUp';
import { useLocation } from "react-router-dom";
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import Appointments from './pages/Appointments';
import PracticeAreas from './pages/PracticeAreas';       // replaces Services
import Features from './pages/Features';                   // NEW
import ClientPortal from './pages/ClientPortal';           // NEW
import Contact from './pages/Contact';                     // NEW
import Privacy from './pages/Privacy';  
import FAQ from './pages/FAQ';                   // NEW
import Dashboard from './pages/Dashboard';
import ClientDashboard from './pages/ClientDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordVerify from './pages/ForgotPasswordVerify';
import ResetPassword from './pages/ResetPassword';
import PublicRoute from './guards/PublicRoute';
import AuthGuard from './guards/AuthGuard';
import GoogleAuthCallback from './pages/GoogleAuthCallback';
import Bot from './components/Bot';
import ScrollToTop from './components/ScrollToTop';
import Feedback from './pages/Feedback';
import Terms from './pages/Terms';
import useAuthStore from './store/authStore';

const hideLayouts = [
    "/login", "/signup",
    "/forgot-password", "/forgot-password/verify", "/forgot-password/reset",
    "/auth/google/callback"
];

// Pages that hide the sidebar (full-width public pages)
const hideSidebar = [
    "/", "/aboutus", "/practice-areas", "/features", "/client-portal",
    "/support", "/feedback", "/privacy", "/terms", "/contact", "/faqs"
];

// Pages that hide navbar + footer (dashboard pages)
const hideNavbarFooter = [
    "/dashboard", "/appointments", "/profile", "/bookings", "/client-dashboard"
];

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated } = useAuthStore();

    const hideLayout = hideLayouts.includes(location.pathname);
    const noSidebar = hideSidebar.includes(location.pathname);
    const hideNavFoot = hideNavbarFooter.includes(location.pathname);

    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";
    const showBot = authed && !isAdmin && !hideLayout;

    return (
        <div className="flex min-h-screen">
            <ScrollToTop />

            {!hideLayout && (
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} hideOnDesktop={noSidebar} />
            )}

            <div className="flex-1 flex flex-col min-w-0">
                {!hideLayout && !hideNavFoot && (
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                )}

                <div className={`${hideLayout ? "w-full h-screen" : "flex-1 bg-gray-50"} ${!hideLayout && !noSidebar ? "p-4" : ""}`}>
                    <Routes>
                        {/* ── Public full-width pages ── */}
                        <Route path="/" element={<Home />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/practice-areas" element={<PracticeAreas />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/client-portal" element={<ClientPortal />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/faqs" element={<FAQ />} />

                        {/* ── Auth ── */}
                        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
                        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                        <Route path="/forgot-password/verify" element={<PublicRoute><ForgotPasswordVerify /></PublicRoute>} />
                        <Route path="/forgot-password/reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />

                        {/* ── User routes ── */}
                        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
                        <Route path="/bookings" element={<AuthGuard><Bookings /></AuthGuard>} />
                        <Route path="/client-dashboard" element={<AuthGuard><ClientDashboard /></AuthGuard>} />

                        {/* ── Admin only ── */}
                        <Route path="/appointments" element={<AuthGuard adminOnly><Appointments /></AuthGuard>} />
                        <Route path="/dashboard" element={<AuthGuard adminOnly><Dashboard /></AuthGuard>} />
                    </Routes>

                    {/* Bot — clients only, never admin */}
                    {showBot && <Bot />}
                </div>

                {!hideLayout && !hideNavFoot && <Footer />}
            </div>
        </div>
    );
}

export default App;