import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext.js";
import useConversations from "../zustand/useConversation.js";

function useListenMessages() {
  const { socket } = useSocketContext();
  const { conversations, setConversations } = useConversations();

  useEffect(() => {
    if (socket) {
      socket.on("removeFriend", (friendId) => {
        const updatedConversations = conversations.filter(
          (conversation) => conversation._id !== friendId
        );

        setConversations(updatedConversations);
      });

      return () => socket.off("removeFriend");
    }
  }, [socket, conversations, setConversations]);
}

export default useListenMessages;
