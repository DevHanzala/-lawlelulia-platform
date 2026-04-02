import { useState } from "react";
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../utils/config.jsx";
import MessageParser from "../utils/MessageParser";
import ActionProvider from "../utils/ActionProvider";


const Bot = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-[#0A0F1C] text-white px-4 py-2 rounded-full shadow-lg"
            >
                {open ? null : (
                    <>
                        <span>💬</span>
                        <span className="text-sm font-medium">Ask CoCoLaw AI</span>
                    </>
                )}
            </button>

            {open && (
                <div className="mt-3 w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-[#0A0F1C] flex justify-between text-white px-4 py-3 text-sm font-semibold">
                        <p>CoCoLaw AI</p>
                        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200">
                            &times;
                        </button>
                    </div>

                    {/* Chatbot */}
                    <div className="w-full h-full">
                        <Chatbot
                            config={config}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bot;