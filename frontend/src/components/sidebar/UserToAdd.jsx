import React from "react";
import toast from "react-hot-toast";

import { IoMdAdd } from "react-icons/io";
import { MdFileDownloadDone } from "react-icons/md";

function UserToAdd({ friendToAdd, lastIdx }) {
  const [reqSent, setReqSent] = React.useState(false);

  async function sendRequest() {
    try {
      const res = await fetch(
        `/api/users/send-friend-request/${friendToAdd._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Request sent successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function cancelRequest() {
    try {
      const res = await fetch(
        `/api/users/cancel-friend-request/${friendToAdd._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Request cancelled successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <div
        className={`flex p-2 py-1 cursor-pointer gap-2 items-center rounded hover:text-lg hover:text-white 
        }`}
      >
        <div className={`avatar`}>
          <div className="w-14 rounded-full">
            <img src={friendToAdd.profilePic} alt="Profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold">{friendToAdd.username}</p>
          </div>
        </div>

        <div className="rounded bg-green-500 p-1 text-black hover:text-white">
          {reqSent ? (
            <MdFileDownloadDone
              onClick={() => {
                setReqSent(!reqSent);
                cancelRequest();
              }}
            />
          ) : (
            <IoMdAdd
              onClick={() => {
                setReqSent(!reqSent);
                sendRequest();
              }}
            />
          )}
        </div>
      </div>

      {!lastIdx && (
        <div className=" divider bg-white rounded my-0 py-0 h-0.5 mt-1 mb-2" />
      )}
    </>
  );
}

export default UserToAdd;
