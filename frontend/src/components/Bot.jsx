import { useState } from "react";
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../utils/config";
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
                {open ? "Close" : "Chat"}
            </button>

            {open && (
                <div className="mt-3 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-[#0A0F1C] text-white px-4 py-3 text-sm font-semibold">
                        CoCoLaw AI Assistant
                    </div>

                    {/* Chatbot */}
                    <div className="h-[calc(100%-48px)]">
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