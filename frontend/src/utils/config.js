import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "CoCoLaw AI",
    initialMessages: [createChatBotMessage("Hi 👋 Ask me your legal question.")],
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