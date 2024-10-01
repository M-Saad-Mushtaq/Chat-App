import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext.js";
import useConversations from "../zustand/useConversation.js";

import notificationSound from "../assests/sounds/notification.mp3";

function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversations();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("newMessage");
  }, [socket, messages, setMessages]);
}

export default useListenMessages;
