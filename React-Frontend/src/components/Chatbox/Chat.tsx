import React, { useState } from "react";
fetch;
import MistralClient from "@mistralai/mistralai";
import InputBar from "./InputBar";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY as string;
const client = new MistralClient(apiKey);

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchCheeseRecommendation = async (query: string) => {
    try {
      const chatResponse = await client.chat({
        model: "open-mistral-7b",
        messages: [...messages, { role: "user", content: query }],
      });
      return chatResponse.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching cheese recommendation:", error);
      return "Sorry, I couldn't get a recommendation at this time.";
    }
  };

  const handleUserMessageSubmit = async (inputMessage: string) => {
    if (inputMessage.trim() !== "") {
      const userMessage: Message = { role: "user", content: inputMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botResponse = await fetchCheeseRecommendation(inputMessage);
      const botMessage: Message = { role: "assistant", content: botResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4">
        <div className="overflow-y-auto h-80">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded ${message.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 self-start"}`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <InputBar
          placeholder="Type a message..."
          onSubmit={handleUserMessageSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
