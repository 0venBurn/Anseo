import React, { useState, useEffect, useRef } from "react";
import MistralClient from "@mistralai/mistralai";
import InputBar from "./InputBar";
import ChatIcon from "@mui/icons-material/Chat";

//Retrieve API key from environment variables
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY as string;
//Initialise the Mistral client with the retrieved API key
const client = new MistralClient(apiKey);

//Define the structure of a Message
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

//Main Chat component
const Chat: React.FC = () => {
  //State to manage the list of messages
  const [messages, setMessages] = useState<Message[]>([]);
  //State to manage the expansion state of the chat widget
  const [isExpanded, setIsExpanded] = useState(false);
  //Ref to handle scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  //Function to scroll to the bottom of the messages in the chat widget
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Scroll to the bottom of the chat widget as the conversation updates with new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //Scroll to the most recent message in the conversdation i.e., the bottom message, when the chat widget expands
  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [isExpanded]);

  //Function to fetch recommendations from the Mistral API
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

  //Function to handle the submission of a user's message
  const handleUserMessageSubmit = async (inputMessage: string) => {
    if (inputMessage.trim() !== "") {
      const userMessage: Message = { role: "user", content: inputMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      //Fetch response from the assistant
      const botResponse = await fetchCheeseRecommendation(inputMessage);
      const botMessage: Message = { role: "assistant", content: botResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  //Rendered Chat component
  return (
    <div className="h-20 md:h-0 bg-bk-grey">
      {isExpanded ? (
        <div
          className={`transform transition-transform duration-300 ease-in-out w-11/12 md:w-6/12 lg:w-4/12 bg-white rounded-lg fixed bottom-4 right-4 ${
            isExpanded
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between bg-primary-dark px-5 py-4 rounded-t-lg">
              <h3
                className="text-3xl font-regular text-primary-light text-center p-2 rounded"
                style={{ fontFamily: "Commissioner" }}
              >
                Chat with Anseo{" "}
              </h3>
              <button
                className="bg-primary-light text-primary-dark-text"
                onClick={() => setIsExpanded(false)}
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              >
                ⛌
              </button>
            </div>
            <div className="p-4">
              <div className="overflow-y-auto h-80">
                <div className="flex justify-center w-full my-5">
                  <div className="w-8/12 h-64 bg-chatbotImage bg-contain bg-center bg-no-repeat opacity-95"></div>
                </div>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{ fontFamily: "Commissioner" }}
                    className={`p-2 rounded message-tail ${
                      message.role === "user"
                        ? "bg-yellow text-primary-text-dark self-end inline-block max-w-9/12 w-auto mb-5 rounded-xl px-4"
                        : "bg-bk-grey text-primary-text-dark ml-auto w-9/12 rounded-xl max-w-full mb-5 px-4 mr-5"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <InputBar
                placeholder="Type a message..."
                onSubmit={handleUserMessageSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          className="transform transition-transform duration-300 ease-in-out bg-primary-dark text-white shadow-md fixed bottom-4 right-4 md:bottom-8 md:right-12"
          onClick={() => setIsExpanded(true)}
          style={{ width: "65px", height: "65px", borderRadius: "50%" }}
        >
          <div
            className="text-primary-light text-center"
            style={{ fontFamily: "Commissioner" }}
          >
            <ChatIcon />
          </div>
        </button>
      )}
    </div>
  );
};

export default Chat;
