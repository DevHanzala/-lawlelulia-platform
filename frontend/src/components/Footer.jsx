import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import useAuthStore from "../store/authStore";

const Footer = () => {
    const { user, isAuthenticated } = useAuthStore();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    const services = [
        { label: "Legal Research & Drafting", hash: "legal-research" },
        { label: "Procedural Guidance",       hash: "procedural-guidance" },
        { label: "Evidence Organization",     hash: "evidence-organization" },
        { label: "Courtroom Coaching",        hash: "courtroom-coaching" },
        { label: "Emotional Guardrails",      hash: "emotional-guardrails" },
        { label: "Intelligent Co-Counsel",    hash: "co-counsel" },
    ];

    const support = [
        { label: "Help Center",      path: "/support" },
        { label: "Submit Feedback",  path: "/feedback" },
        { label: "Report an Issue",  path: "/support" },
        { label: "FAQs",             path: "/support" },
        { label: "Terms of Service", path: "/terms" },
    ];

    return (
        <footer className="w-full text-white bg-[#0A0F1C]">

            {/* ── Brand row — always full width ── */}
            <div className="mx-auto px-6 md:px-10 lg:px-16 pt-10 pb-8 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                    <div className="max-w-sm">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#0A0F1C] text-lg shrink-0">C</div>
                            <span className="font-bold text-xl tracking-wide">CoCoLaw.ai</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            AI-powered co-counsel for self-represented litigants. Leveling the playing field so everyone can navigate the legal system with confidence.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex space-x-2 mx-auto">
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

            {/* ── Link columns: 2-col on mobile, 4-col on lg ── */}
            <div className="mx-auto px-6 md:px-10 lg:px-16 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h5>
                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: "Home",     path: "/" },
                                { label: "About Us", path: "/aboutus" },
                                { label: "Services", path: "/services" },
                                { label: "Profile",  path: "/profile" },
                                ...(!isAdmin ? [{ label: "Book Appointment", path: "/bookings" }, { label: " Dashboard", path: "/client-dashboard" }] : []),
                                ...(isAdmin  ? [
                                    { label: "Dashboard",    path: "/dashboard" },
                                    { label: "Appointments", path: "/appointments" },
                                ] : []),
                            ].map((item) => (
                                <Link key={item.path} to={item.path}
                                    className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-white transition shrink-0" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services — anchor links */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Services</h5>
                        <div className="flex flex-col gap-2.5">
                            {services.map((s) => (
                                <a key={s.hash} href={`/services#${s.hash}`}
                                    className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-white transition shrink-0" />
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Support</h5>
                        <div className="flex flex-col gap-2.5">
                            {support.map((s) => (
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
                                <p className="text-sm text-gray-400">+1 (213) 555-0192</p>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="text-gray-500 mt-0.5 shrink-0 text-xs" />
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    350 S Grand Ave, Suite 2800<br />
                                    Los Angeles, CA 90071
                                </p>
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
                    <p className="text-xs text-gray-500">© 2026 CoCoLaw.ai — All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
                            <span key={item} className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;