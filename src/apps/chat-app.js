import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messageEndRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        username,
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const handleLogin = () => {
    if (username.trim() !== "") {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mx-auto mt-8">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Login to Chat
          </h1>
          <input
            type="text"
            placeholder="Enter username"
            className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-xl py-2 px-3 mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <div className="flex-grow p-6 overflow-auto bg-gray-100 rounded-lg shadow-md">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">
                    {message.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-gray-800">{message.text}</p>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          <div className="flex-none p-4 bg-white border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-xl py-2 px-3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSendMessage}
              >
                <FiSend className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
