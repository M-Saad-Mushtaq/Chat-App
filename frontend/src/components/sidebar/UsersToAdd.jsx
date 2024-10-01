import React from "react";
import UserToAdd from "./UserToAdd.jsx";

import useUsersToAdd from "../../zustand/useUsersToAdd.js";

function UsersToAdd() {
  const { usersToAdd } = useUsersToAdd();

  return (
    <div className="py-2 flex flex-col overflow-auto mb-auto">
      {usersToAdd.length > 0 ? (
        usersToAdd.map((userToAdd, idx) => (
          <UserToAdd
            key={userToAdd._id}
            friendToAdd={userToAdd}
            lastIdx={idx === usersToAdd.length - 1}
          />
        ))
      ) : (
        <span className="flex justify-center text-center ">
          Search to Add Friends
        </span>
      )}

      {/* {loading ? <span className="loading loading-spinner mx-auto" /> : null} */}
    </div>
  );
}

export default UsersToAdd;
