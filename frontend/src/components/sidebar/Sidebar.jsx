import React from "react";
import SearchFriendInput from "./SearchFriendInput.jsx";
import SearchUserInput from "./SearchUserInput.jsx";
import Conversations from "./Conversations.jsx";
import UsersToAdd from "./UsersToAdd.jsx";
import LogoutButton from "./Logout.jsx";
import Requests from "./Requests.jsx";

import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = React.useState("friends"); // Default tab is 'friends'

  return (
    <div className="border-r border-white-500 p-4 flex flex-col sidebar">
      <div>
        {/* Friends Tab */}
        <span
          className={`btn border-2 m-4 mb-10 ${
            selectedTab === "friends"
              ? "bg-black text-white"
              : "bg-white text-black"
          } hover:bg-black hover:text-white`}
          onClick={() => setSelectedTab("friends")}
        >
          <FaUserFriends />
        </span>

        {/* Add Friend Tab */}
        <span
          className={`btn border-2 m-4 mb-10 ${
            selectedTab === "addFriend"
              ? "bg-black text-white"
              : "bg-white text-black"
          } hover:bg-black hover:text-white`}
          onClick={() => setSelectedTab("addFriend")}
        >
          <IoPersonAddSharp />
        </span>

        {/* Requests Tab */}
        <span
          className={`btn border-2 m-4 mb-10 ${
            selectedTab === "requests"
              ? "bg-black text-white"
              : "bg-white text-black"
          } hover:bg-black hover:text-white`}
          onClick={() => setSelectedTab("requests")}
        >
          <MdGroupAdd />
        </span>
      </div>

      {/* Render components based on selected tab */}
      {selectedTab === "friends" && (
        <>
          <SearchFriendInput />
          <div className="divider px-3"></div>
          <Conversations />
          <LogoutButton />
        </>
      )}

      {selectedTab === "addFriend" && (
        <>
          <SearchUserInput />
          <div className="divider px-3"></div>
          <UsersToAdd />
          <LogoutButton />
        </>
      )}

      {selectedTab === "requests" && (
        <>
          <div className="divider px-3"></div>
          <Requests />
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default Sidebar;
