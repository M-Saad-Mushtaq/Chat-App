import React from "react";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

function Home({ showSidebar }) {
  return (
    <div className="flex justify-between overflow-hidden bg-neutral text-neutral-content">
      {showSidebar && (
        <div className="fixed left-0 top-[7vh] h-full bg-neutral text-neutral-content">
          <Sidebar />
        </div>
      )}
      <div
        className={`flex flex-grow justify-center w-full sm:h-[500px] md:h-[650px] rounded-lg ${
          showSidebar ? "" : ""
        }`}
      >
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
