const Home = () => {
    return (
        <div className="bg-gray-50">

            {/* HERO SECTION */}
            <section className="text-center py-16 px-6">
                <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
                    Your AI Co-Counsel for Navigating the Legal System
                </h1>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    CoCoLaw.ai empowers self-represented litigants with legal research,
                    document drafting, and procedural guidance — all in plain language.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
                        Get Started
                    </button>
                    <button className="border px-6 py-3 rounded-md hover:bg-gray-100">
                        Learn More
                    </button>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="px-6 md:px-12 py-12">
                <h2 className="text-2xl font-semibold text-center mb-8">
                    The Problem: Pro Se Litigants Face an Uphill Battle
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-medium mb-2">Low Success Rate</h3>
                        <p className="text-sm text-gray-600">
                            Only 2–11% of pro se plaintiffs win federal civil cases.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-medium mb-2">Procedural Complexity</h3>
                        <p className="text-sm text-gray-600">
                            Cases fail due to dismissals, defaults, and technical rules.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-medium mb-2">Unequal Playing Field</h3>
                        <p className="text-sm text-gray-600">
                            Courts apply the same complex rules as they do for lawyers.
                        </p>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="px-6 md:px-12 py-12 bg-white">
                <h2 className="text-2xl font-semibold text-center mb-8">
                    Intelligent AI Co-Counsel
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="border border-gray-300 p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Legal Research & Drafting</h3>
                        <p className="text-sm text-gray-600">
                            Jurisdiction-specific research and document generation.
                        </p>
                    </div>

                    <div className="border border-gray-300  p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Procedural Guidance</h3>
                        <p className="text-sm text-gray-600">
                            Step-by-step guidance with deadline tracking.
                        </p>
                    </div>

                    <div className="border border-gray-300  p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Evidence Organization</h3>
                        <p className="text-sm text-gray-600">
                            Organize evidence and prepare objections effectively.
                        </p>
                    </div>

                    <div className="border border-gray-300  p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Courtroom Coaching</h3>
                        <p className="text-sm text-gray-600">
                            Prepare scripts and learn courtroom decorum.
                        </p>
                    </div>

                    <div className="border border-gray-300  p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Emotional Guardrails</h3>
                        <p className="text-sm text-gray-600">
                            Stay objective and make better legal decisions.
                        </p>
                    </div>

                    <div className="border border-gray-300  p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Affordable & Secure</h3>
                        <p className="text-sm text-gray-600">
                            Cost-effective, private, and always up-to-date.
                        </p>
                    </div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="px-6 md:px-12 py-12 bg-gray-50">
                <h2 className="text-2xl font-semibold text-center mb-8">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-4 gap-6 text-center">

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-2">01</div>
                        <p className="text-sm">Describe your situation</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-2">02</div>
                        <p className="text-sm">AI analyzes your case</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-2">03</div>
                        <p className="text-sm">Get legal documents</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-2">04</div>
                        <p className="text-sm">File with confidence</p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16 px-6 bg-black text-white">
                <h2 className="text-2xl md:text-3xl font-semibold">
                    Start Your Legal Journey Today
                </h2>
                <p className="mt-3 text-gray-300">
                    Get the guidance you need without the high legal costs.
                </p>

                <button className="mt-6 bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200">
                    Try CoCoLaw.ai
                </button>
            </section>

        </div>
    );
};

export default Home;