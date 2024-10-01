import React from "react";
import Conversation from "./Conversation.jsx";

import useGetConversations from "../../hooks/useGetConversations.js";
import useUsersToAdd from "../../zustand/useUsersToAdd.js";
import useRemoveFriend from "../../hooks/useRemoveFriend.js";

function Converstaions() {
  const { loading, conversations } = useGetConversations();
  useRemoveFriend();

  const { setUsersToAdd } = useUsersToAdd();

  React.useEffect(() => {
    setUsersToAdd([]);
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto mb-auto">
      {conversations.length > 0
        ? conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIdx={idx === conversations.length - 1}
            />
          ))
        : "Add Friends"}

      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
}

export default Converstaions;
