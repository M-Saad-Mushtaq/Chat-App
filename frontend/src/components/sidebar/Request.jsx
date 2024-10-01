import React from "react";
import toast from "react-hot-toast";

import { RxCross2 } from "react-icons/rx";
import { MdFileDownloadDone } from "react-icons/md";

import useRequests from "../../zustand/useRequests.js";

function Request({ request, lastIdx }) {
  const { setRequests } = useRequests();

  const updateRequests = async () => {
    try {
      const res = await fetch(`/api/users/requests`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setRequests(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function acceptRequest() {
    try {
      const res = await fetch(
        `/api/users/accept-friend-request/${request._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Request accepted successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function cancelRequest() {
    try {
      const res = await fetch(
        `/api/users/cancel-friend-request/${request._id}`,
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
        className={`flex p-2 py-1 cursor-pointer gap-2 items-center rounded hover:text-lg hover:text-white `}
      >
        <div className={`avatar`}>
          <div className="w-14 rounded-full">
            <img src={request.profilePic} alt="Profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold">{request.username}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <span className="rounded bg-red-500 p-1 hover:text-black">
            {" "}
            <RxCross2
              className="text-2xl"
              onClick={async () => {
                await cancelRequest();
                await updateRequests();
              }}
            />
          </span>
          <span className="rounded bg-green-500 p-1 hover:text-black">
            <MdFileDownloadDone
              className="text-2xl"
              onClick={async () => {
                await acceptRequest();
                await updateRequests();
              }}
            />
          </span>
        </div>
      </div>

      {!lastIdx && (
        <div className="divider bg-white rounded my-0 py-0 h-0.5 mt-1 mb-2" />
      )}
    </>
  );
}

export default Request;
