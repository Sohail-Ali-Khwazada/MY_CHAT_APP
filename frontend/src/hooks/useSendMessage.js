import { useState } from "react"
import useConversation from "../zustand/useConversation";
import useToken from "../zustand/useToken";


function useSendMessage() {
  const [loading,setLoading] = useState(false);
  const {messages,setMessages,selectedConversation}= useConversation();
  const {authToken} = useToken();

  const sendMessage = async(message) => {
    setLoading(true);
    try {
      // const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`, {
      const res = await fetch(`https://my-chat-app-6xac.onrender.com/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({message}),
        credentials: 'include'
      })
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      setMessages([...messages,data]);
    }catch(error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {sendMessage,loading};
}

export default useSendMessage
