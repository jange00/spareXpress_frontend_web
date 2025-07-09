// src/components/ChatComponent.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hook/chatbot/useChat';
import { MessageCircle, X } from 'lucide-react';

const ChatComponent = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false); // For toggling chat
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-300 p-3 rounded-full shadow-lg text-black"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-[350px] md:w-[400px] h-[600px] bg-white shadow-xl rounded-xl flex flex-col border border-gray-300">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b bg-yellow-400 rounded-t-xl">
            <h2 className="text-black font-semibold">XpressBot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-yellow-400 text-black self-end ml-auto'
                    : 'bg-gray-100 text-gray-800 self-start mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-sm text-gray-500 italic">XpressBot is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-200 p-3 bg-gray-50"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about a part..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
