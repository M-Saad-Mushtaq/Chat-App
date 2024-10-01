import { useEffect } from "react";
import toast from "react-hot-toast";

import { useSocketContext } from "../context/SocketContext.js";
import useRequests from "../zustand/useRequests.js";

function useGetNewRequests() {
  const { socket } = useSocketContext();
  const { requests, setRequests } = useRequests();

  useEffect(() => {
    socket.on("newRequest", (newRequest) => {
      toast.success("New Friend Request");
      setRequests([...requests, newRequest]);
    });
    return () => socket.off("newRequest");
  }, [socket, requests, setRequests]);
}

export default useGetNewRequests;
