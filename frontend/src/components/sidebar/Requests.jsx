import React from "react";
import toast from "react-hot-toast";

import Request from "./Request.jsx";
import useRequests from "../../zustand/useRequests.js";
import useGetNewRequests from "../../hooks/useGetNewRequest.js";

import useUsersToAdd from "../../zustand/useUsersToAdd.js";

function Requests() {
  const { requests, setRequests } = useRequests();
  useGetNewRequests();

  const { setUsersToAdd } = useUsersToAdd();

  React.useEffect(() => {
    const getRequests = async () => {
      try {
        setUsersToAdd([]);
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
    getRequests();
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto mb-auto">
      {requests.length > 0 ? (
        requests.map((request, idx) => (
          <Request
            key={request._id}
            request={request}
            lastIdx={idx === requests.length - 1}
          />
        ))
      ) : (
        <span className="flex justify-center text-center">No Requests</span>
      )}

      {/* {loading ? <span className="loading loading-spinner mx-auto" /> : null} */}
    </div>
  );
}

export default Requests;
