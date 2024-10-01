import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext.js";
import useConversations from "../zustand/useConversation.js";

function useAddFriend() {
  const { socket } = useSocketContext();
  const { conversations, setConversations } = useConversations();

  useEffect(() => {
    if (socket) {
      socket.on("requestAccepted", (newConversation) => {
        setConversations([newConversation, ...conversations]);
      });

      return () => socket.off("requestAccepted");
    }
  }, [socket, conversations, setConversations]);
}

export default useAddFriend;
