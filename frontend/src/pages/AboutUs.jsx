const AboutUs = () => {
    return (
        <div className="p-6 md:p-12 bg-gray-50">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold">About CoCoLaw.ai</h1>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                    Empowering self-represented litigants with AI-driven legal support
                </p>
            </div>

            {/* Challenges Section */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Challenges for Self-Represented Litigants</h2>
                    <p className="text-gray-600 mb-4">
                        Millions of Americans navigate courts alone every year across various legal matters, facing significant disadvantages.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li><strong>Low Success Rate:</strong> Pro se plaintiffs win only 2-11% of federal civil cases.</li>
                        <li><strong>Procedural Hurdles:</strong> Most cases fail due to dismissals, defaults, and sanctions.</li>
                        <li><strong>Unequal Playing Field:</strong> Courts enforce complex rules of procedure and evidence.</li>
                    </ul>
                </div>

                {/* Pain Points */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Top 10 Pain Points</h2>
                    <ul className="list-decimal pl-5 space-y-2 text-gray-600 text-sm md:text-base">
                        <li>Lack of Substantive Legal Knowledge</li>
                        <li>Procedural & Technical Rule Complexity</li>
                        <li>Difficulty with Discovery</li>
                        <li>Evidentiary & Trial Preparation Issues</li>
                        <li>Courtroom Inexperience & Decorum</li>
                        <li>Emotional Attachment & Loss of Objectivity</li>
                        <li>Resource & Logistical Constraints</li>
                        <li>Massive Time & Energy Demands</li>
                        <li>Perceived/Actual Judicial Bias</li>
                        <li>Lower Success Rates & Systemic Disadvantages</li>
                    </ul>
                </div>
            </div>

            {/* How CoCoLaw Helps */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-center mb-6">How CoCoLaw.ai Helps</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="font-medium mb-2">Jurisdiction-Specific Research</h3>
                        <p className="text-gray-600 text-sm">Tailored legal research and document creation specific to your jurisdiction.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="font-medium mb-2">Procedural Guidance</h3>
                        <p className="text-gray-600 text-sm">Step-by-step guidance through legal procedures with automatic deadline tracking.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="font-medium mb-2">Evidence & Courtroom Support</h3>
                        <p className="text-gray-600 text-sm">Organize evidence, draft objections, and prepare courtroom scripts with coaching on decorum.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="font-medium mb-2">Emotional & Settlement Tools</h3>
                        <p className="text-gray-600 text-sm">Manage emotional responses and analyze settlement options with guided tools.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h3 className="font-medium mb-2">Affordable & Secure</h3>
                        <p className="text-gray-600 text-sm">A cost-effective subscription model with privacy and up-to-date legal information.</p>
                    </div>
                </div>
            </div>

            {/* User Journey */}
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
                <div className="flex flex-col md:flex-row md:justify-center gap-6">
                    <div className="bg-white p-6 rounded-lg shadow flex-1">
                        <h3 className="font-medium mb-2">Describe Your Situation</h3>
                        <p className="text-gray-600 text-sm">Clearly articulate your legal issue in plain English.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow flex-1">
                        <h3 className="font-medium mb-2">AI Legal Analysis</h3>
                        <p className="text-gray-600 text-sm">Our AI analyzes your facts against relevant laws and rules.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow flex-1">
                        <h3 className="font-medium mb-2">Receive Actionable Outputs</h3>
                        <p className="text-gray-600 text-sm">Get court-ready drafts, checklists, and strategic options.</p>
                    </div>
                </div>
                <button className="mt-8 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                    Start Your Case
                </button>
            </div>

        </div>
    );
};

export default AboutUs;