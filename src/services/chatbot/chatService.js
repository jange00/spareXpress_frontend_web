import { postChatQuery } from "../../api/chatBotApi"; 

export const sendChatMessage = async ({ query, history }) => {
  // Call the raw API function
  const response = await postChatQuery({ query, history });

  // Your backend returns a successful response in the shape:
  // { statusCode: 200, data: { reply: "..." }, message: "..." }
  // We extract and return only the reply text.
  if (response && response.data && response.data.reply) {
    return response.data.reply;
  }

  // If the response format is unexpected, throw an error.
  throw new Error("Invalid response format from chatbot API.");
};