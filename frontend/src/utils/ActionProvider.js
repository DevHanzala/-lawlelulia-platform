import { sendMessage } from "../api/chatbot.api";

class ActionProvider {
    constructor(createChatBotMessage, setState) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setState;
    }

    async handleMessage(message) {
        try {
            // Call your backend API (replace /api/chat with your real endpoint)
            const response = await sendMessage(message);
            console.log("API response:", response);

            // Use the API response or fallback
            const botReply = response.data.data || "Sorry, I couldn't answer that.";

            // Create chatbot message
            const botMessage = this.createChatBotMessage(botReply);

            // Update chatbot state
            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));
        } catch (error) {
            console.error("API error:", error);

            // Fallback message on error
            const botMessage = this.createChatBotMessage(
                "Something went wrong. Please try again."
            );

            this.setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));
        }
    }
}

export default ActionProvider;