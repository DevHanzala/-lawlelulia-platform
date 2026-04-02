import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaEnvelope } from "react-icons/fa";
import useAuthStore from "../store/authStore";

const Footer = () => {
    const { user, isAuthenticated } = useAuthStore();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    return (
        <footer className="w-full text-white bg-[#0A0F1C]">

            {/* Main Footer */}
            <div className="mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10">

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Brand — full width on both mobile and sm */}
                    <div className="col-span-2 sm:col-span-2  lg:col-span-1">

                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-[#0A0F1C]">
                                C
                            </div>
                            <span className="font-bold text-3xl">CoCoLaw.ai</span>
                        </div>

                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                            AI-powered co-counsel for litigants. Helping users navigate legal systems confidently.
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-3 ">
                            <a href="#" className="icon"><FaLinkedinIn /></a>
                            <a href="#" className="icon"><FaTwitter /></a>
                            <a href="#" className="icon"><FaFacebookF /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="footer-heading">Quick Links</h5>
                        <div className="footer-links">
                            <Link to="/">Home</Link>
                            <Link to="/aboutus">About</Link>
                            <Link to="/services">Services</Link>
                            <Link to="/profile">Profile</Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h5 className="footer-heading">Services</h5>
                        <div className="footer-links">
                            <p>Legal Research</p>
                            <p>Procedural Guidance</p>
                            <p>Evidence Organization</p>
                            <p>Courtroom Coaching</p>
                        </div>
                    </div>

                   

                    {/* Contact — full width on mobile */}
                    <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                        <h5 className="footer-heading">Contact</h5>

                        <div className="space-y-2 text-sm text-gray-400">
                            <p>📞 +92 324 2650627</p>
                            <p>📍 Karachi, Pakistan</p>

                            <a
                                href="mailto:anassohail34343@gmail.com"
                                className="flex items-center gap-2 hover:text-white transition"
                            >
                                <FaEnvelope />
                                anassohail34343@gmail.com
                            </a>
                        </div>

                        {/* Only show Book Consultation for non-admin users */}
                        {!isAdmin && (
                            <Link
                                to="/bookings"
                                className="mt-4 inline-block text-xs px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition"
                            >
                                Book Consultation →
                            </Link>
                        )}
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">

                    <p>© 2026 CoCoLaw.ai  All rights reserved.</p>

                    <div className="flex gap-4">
                        <span className="hover:text-gray-300 cursor-pointer">Privacy</span>
                        <span className="hover:text-gray-300 cursor-pointer">Terms</span>
                        <span className="hover:text-gray-300 cursor-pointer">Cookies</span>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                .footer-heading {
                    font-size: 12px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    color: white;
                }

                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    font-size: 14px;
                    color: #9ca3af;
                }

                .footer-links a,
                .footer-links p {
                    transition: 0.2s;
                    cursor: pointer;
                }

                .footer-links a:hover,
                .footer-links p:hover {
                    color: white;
                }

                .icon {
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #374151;
                    border-radius: 999px;
                    color: #9ca3af;
                    transition: 0.3s;
                }

                .icon:hover {
                    color: white;
                    border-color: white;
                }
            `}</style>

        </footer>
    );
};

export default Footer;