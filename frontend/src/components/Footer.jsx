const Footer = () => {
    return (
        <div className="w-full text-white">

            {/* Footer Sections */}
            <div className="flex justify-evenly bg-[#0A0F1C]">

                {/* Logo + Text */}
                <div className="flex flex-col flex-2 p-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center font-semibold text-2xl text-black">
                            C
                        </div>
                        <div className="mt-1 font-semibold tracking-wide">
                            ocolaw.ai
                        </div>
                    </div>

                    <p className="text-sm mt-3 text-gray-400 leading-relaxed">
                        I am a dedicated legal professional with experience in handling a wide
                        range of legal matters. My goal is to provide reliable, transparent,
                        and efficient legal services to my clients.
                    </p>
                </div>

                {/* Services */}
                <div className="flex-1 p-8">
                    <h5 className="font-semibold text-lg mb-3 border-b border-gray-700 pb-1 inline-block">
                        Services
                    </h5>
                    <div className="flex flex-col space-y-3 text-sm text-gray-400">
                        <p className="hover:text-blue-400 cursor-pointer transition">Legal consultation</p>
                        <p className="hover:text-blue-400 cursor-pointer transition">Case Handling</p>
                        <p className="hover:text-blue-400 cursor-pointer transition">Documentation Support</p>
                        <p className="hover:text-blue-400 cursor-pointer transition">Court Representation</p>
                    </div>
                </div>

                {/* Socials */}
                <div className="flex-1 p-8">
                    <h5 className="font-semibold text-lg mb-3 border-b border-gray-700 pb-1 inline-block">
                        Socials
                    </h5>
                    <div className="flex flex-col space-y-3 text-sm text-gray-400">
                        <p className="hover:text-blue-400 cursor-pointer transition">Instagram</p>
                        <p className="hover:text-blue-400 cursor-pointer transition">Twitter</p>
                        <p className="hover:text-blue-400 cursor-pointer transition">Facebook</p>
                    </div>
                </div>

                {/* Contact */}
                <div className="flex-1 p-8">
                    <h5 className="font-semibold text-lg mb-3 border-b border-gray-700 pb-1 inline-block">
                        Contact Us
                    </h5>
                    <div className="flex flex-col space-y-3 text-sm text-gray-400">
                        <p>+923242650627</p>
                        <p>Flat E-2, Masjid Street, Light house, Karachi</p>
                        <p>anassohail34343@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* Copyright reserved text */}
            <div className="bg-[#050815] p-4 text-gray-400 text-center text-xs">
                <p>© 2026 Lawlelulia. All rights reserved.</p>
            </div>

        </div>
    )
}

export default Footer;