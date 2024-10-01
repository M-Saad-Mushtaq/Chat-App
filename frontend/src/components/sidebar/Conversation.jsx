import React from "react";
import useConversation from "../../zustand/useConversation.js";
import useAddFriend from "../../hooks/useAddFriend.js";
import { useSocketContext } from "../../context/SocketContext.js";
import { IoPersonRemoveSharp } from "react-icons/io5";
import toast from "react-hot-toast";

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation, removeConversation } =
    useConversation();
  useAddFriend();

  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext(); //setusers
  const isOnline = onlineUsers?.includes(conversation._id);

  const handleClick = async () => {
    try {
      const res = await fetch(`/api/users/remove-friend/${conversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      //setusers from socket

      setSelectedConversation(null);
      removeConversation(conversation._id); // remove from Zustand state

      toast.success("Friend removed successfully");

      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={`flex p-2 py-1 cursor-pointer gap-2 items-center rounded hover:text-lg hover:text-white hover:bg-green-500 ${
          isSelected ? "bg-green-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src={conversation.profilePic} alt="Profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold">{conversation.fullname}</p>
          </div>
        </div>
        <span
          className="bg-white text-black hover:text-red-500 rounded p-2 hover:text-xl hover:cursor-pointer"
          onClick={handleClick} // Trigger the deletion
        >
          <IoPersonRemoveSharp />
        </span>
      </div>

      {!lastIdx && (
        <div className="divider bg-white rounded my-0 py-0 h-0.5 mt-1 mb-2" />
      )}
    </>
  );
}

export default Conversation;
