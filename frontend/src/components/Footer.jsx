import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import useAuthStore from "../store/authStore";

const Footer = () => {
    const { user, isAuthenticated } = useAuthStore();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    const practiceAreas = [
        { label: "Corporate Law",        hash: "corporate-law" },
        { label: "Criminal Defense",     hash: "criminal-defense" },
        { label: "Family Law",           hash: "family-law" },
        { label: "Civil Litigation",     hash: "civil-litigation" },
        { label: "Intellectual Property", hash: "intellectual-property" },
    ];

    const company = [
        { label: "FAQ",       path: "/faqs" },
        { label: "Privacy Policy",  path: "/privacy" },
        { label: "Contact Us",     path: "/contact" },
        { label: "Feedback",       path: "/feedback" },
    ];

    

    return (
        <footer className="w-full text-white bg-[#0A0F1C]">

            {/* ── Brand row ── */}
            <div className="mx-auto px-6 md:px-10 lg:px-16 pt-10 pb-8 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                    <div className="max-w-sm">
                        <Link to="/">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#0A0F1C] text-lg shrink-0">C</div>
                            <span className="font-bold text-xl tracking-wide">CoCoLaw.ai</span>
                        </div>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            A modern law firm powered by intelligent technology. Strategic legal counsel  smarter, faster, better.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex space-x-2">
                            {[
                                { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                                { icon: <FaTwitter />,    href: "https://twitter.com" },
                                { icon: <FaFacebookF />,  href: "https://facebook.com" },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-white hover:text-white transition text-xs">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                        {!isAdmin && (
                            <Link to="/bookings"
                                className="inline-block text-center text-sm px-4 py-2 bg-white text-[#0A0F1C] rounded-lg font-bold hover:bg-gray-200 transition md:w-fit">
                                Book Consultation →
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Link columns ── */}
            <div className="mx-auto px-6 md:px-10 lg:px-16 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h5>
                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: "Features",       path: "/features" },
                                { label: "Client Portal",  path: "/client-portal" },
                                { label: "Contact",        path: "/contact" },
                                ...(!isAdmin ? [{ label: "Book Appointment", path: "/bookings" }, { label: "My Dashboard", path: "/client-dashboard" }] : []),
                                ...(isAdmin  ? [{ label: "Dashboard", path: "/dashboard" }, { label: "Appointments", path: "/appointments" }] : []),
                            ].map((item) => (
                                <Link key={item.path + item.label} to={item.path}
                                    className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-white transition shrink-0" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Practice Areas</h5>
                        <div className="flex flex-col gap-2.5">
                            {practiceAreas.map((s) => (
                                <a key={s.hash} href={`/practice-areas#${s.hash}`}
                                    className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-white transition shrink-0" />
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company & Legal */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h5>
                        <div className="flex flex-col gap-2.5 mb-5">
                            {company.map((s) => (
                                <Link key={s.label} to={s.path}
                                    className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-white transition shrink-0" />
                                    {s.label}
                                </Link>
                            ))}
                        </div>
                        
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact</h5>
                        <div className="flex flex-col gap-3">
                            
                            <div className="flex items-start gap-2.5">
                                <FaPhone className="text-gray-500 mt-0.5 shrink-0 text-xs" />
                                <p className="text-sm text-gray-400"><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="text-gray-500 mt-0.5 shrink-0 text-xs" />
                                <p className="text-sm text-gray-400 leading-relaxed"><a href="https://maps.google.com/?q=123+Legal+Street,+Lawville,+State+12345" target="_blank" rel="noopener noreferrer">123 Legal Street, Lawville, State 12345</a></p>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <FaEnvelope className="text-gray-500 mt-0.5 shrink-0 text-xs" />
                                <a href="mailto:support@cocolaw.ai"
                                    className="text-sm text-gray-400 hover:text-white transition break-all">
                                    support@cocolaw.ai
                                </a>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t border-gray-800 bg-[#050815]">
                <div className="mx-auto px-6 md:px-10 lg:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-xs text-gray-500">© 2026 CoCoLaw.ai  All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { label: "Privacy Policy", path: "/privacy" },
                            { label: "Terms of Service", path: "/terms" },
                            { label: "Contact", path: "/contact" },
                        ].map((item) => (
                            <Link key={item.label} to={item.path} className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;