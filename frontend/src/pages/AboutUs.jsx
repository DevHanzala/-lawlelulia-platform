const AboutUs = () => {
    return (
        <div className="p-6">

            {/* Header */}
            <div>
                <h1 className="text-xl font-semibold">Learn About Me</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Learn more about our legal services
                </p>
            </div>

            {/* Main Card */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">

                {/* Profile Section */}
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    <div>
                        <h2 className="text-lg font-medium">Advocate John Smith</h2>
                        <p className="text-sm text-gray-500">Professional Lawyer</p>
                    </div>
                </div>

                {/* About Description */}
                <div className="mt-6">
                    <h3 className="text-md font-medium">About Me</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        I am a dedicated legal professional with experience in handling a wide
                        range of legal matters. My goal is to provide reliable, transparent,
                        and efficient legal services to my clients.
                    </p>
                </div>

                {/* Services (FLEX VERSION) */}
                <div className="mt-6">
                    <h3 className="text-md font-medium">Services Offered</h3>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex-1 min-w-[200px] p-4 bg-gray-200 rounded-md text-sm font-semibold">
                            Legal Consultation
                        </div>
                        <div className="flex-1 min-w-[200px] p-4 bg-gray-200 rounded-md text-sm font-semibold">
                            Case Handling
                        </div>
                        <div className="flex-1 min-w-[200px] p-4 bg-gray-200 rounded-md text-sm font-semibold">
                            Documentation Support
                        </div>
                        <div className="flex-1 min-w-[200px] p-4 bg-gray-200 rounded-md text-sm font-semibold">
                            Court Representation
                        </div>
                    </div>
                </div>

                {/* Why Choose */}
                <div className="mt-6">
                    <h3 className="text-md font-medium">Why Choose Us</h3>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc pl-4">
                        <li>Experienced and professional service</li>
                        <li>Transparent communication</li>
                        <li>Easy appointment booking</li>
                        <li>Client-focused approach</li>
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        Need legal assistance? Book an appointment today.
                    </p>
                    <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                        Book Appointment
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;