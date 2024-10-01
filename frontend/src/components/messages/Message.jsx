import React from "react";
import { useAuthContext } from "../../context/AuthContext.js";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime.js";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "" : "bg-blue-300";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName} message`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble bg-white text-black ${bubbleBgColor}  break-words max-w-[300px] overflow-hidden`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
