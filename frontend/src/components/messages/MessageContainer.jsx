import React, { useEffect, useState } from "react";
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation.js";
import { useAuthContext } from "../../context/AuthContext.js";

function NoChatSelected() {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center min-w-[500px] h-full">
      <div className="p-4 text-center sm:text-lg md:text-xl font-semobold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullname}</p>
        <p>Select a chat to start messaging...</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[700px] flex flex-col messageContainer">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="px-4 py-2 mb-2 border-b border-white-500 flex justify-between items-center h-16">
            <div className="flex gap-2">
              <span>To: </span>
              <span className="font-bold">{selectedConversation.fullname}</span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;
