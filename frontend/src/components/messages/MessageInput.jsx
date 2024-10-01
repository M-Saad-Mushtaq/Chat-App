import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || message === "") {
      return;
    }

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3 message-input" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          className="border text-sm rounded-lg block w-full p-2.5 pr-12 text-black"
          placeholder="Type a Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner" />
          ) : (
            <BsSend className="text-black " />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
