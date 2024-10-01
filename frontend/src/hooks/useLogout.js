import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

import useRequests from "../zustand/useRequests";
import useUsersToAdd from "../zustand/useUsersToAdd";

function useLogout() {
  const [loading, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();
  const { setRequests } = useRequests();
  const { setUsersToAdd } = useUsersToAdd();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      setRequests([]);
      setUsersToAdd([]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}

export default useLogout;
