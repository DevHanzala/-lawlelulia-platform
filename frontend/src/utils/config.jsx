import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "CoCoLaw AI",
    initialMessages: [
        createChatBotMessage("Hi 👋 Ask me your legal question.")
    ],

    customComponents: {
        botAvatar: () => (
            <div className="w-9 h-9 rounded-full bg-[#0A0F1C] text-lg text-white flex items-center justify-center font-bold">
                C
            </div>
        ),
    },

    customStyles: {
        botMessageBox: {
            backgroundColor: "#0A0F1C",
        },
        chatButton: {
            backgroundColor: "#0A0F1C",
        },
    },
};

export default config;