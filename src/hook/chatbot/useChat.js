import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '../../services/chatbot/chatService'; 

// The initial message from the bot, as defined in your backend prompt.
const initialMessage = {
  role: 'model', // 'model' refers to the AI
  text: "Hey there! 👋 I'm XpressBot, your SpareXpress assistant. Whether you’re upgrading your PC or fixing your ride, I’m here to help. What part are you looking for today?",
};

export const useChat = () => {
  const [messages, setMessages] = useState([initialMessage]);

  const { mutate, isPending: isLoading, error } = useMutation({
    mutationFn: sendChatMessage, // The function that will be called to send the message
    onSuccess: (reply) => {
      // When the API call is successful, add the bot's reply to the chat
      const botMessage = { role: 'model', text: reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    },
    onError: (err) => {
      // If the API call fails, add an error message to the chat
      const errorMessage = {
        role: 'model',
        text: `Sorry, something went wrong. ${err.message || 'Please try again later.'}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    },
  });
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newUserMessage = { role: 'user', text };
    
    // Optimistically update the UI with the user's message immediately
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);

    // Prepare the history for the API call (exclude the latest user message)
    // The backend will receive the current message as `query`
    const history = messages; 

    // Call the mutation to send the data to the backend
    mutate({ query: text, history });
  };

  return {
    messages,
    sendMessage,
    isLoading,
    error,
  };
};