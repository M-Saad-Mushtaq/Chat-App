import React from "react";
import { FaSearch } from "react-icons/fa";
import useUsersToAdd from "../../zustand/useUsersToAdd.js";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [searchTerm, setSearch] = React.useState("");

  const { setUsersToAdd } = useUsersToAdd();

  const fetchUsers = async () => {
    try {
      if (!searchTerm || searchTerm === "") {
        searchTerm = "~!@~!@~";
      }

      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: searchTerm }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!searchTerm) {
      return;
    }
    if (searchTerm.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const friendsToAdd = await fetchUsers();

    if (friendsToAdd.length > 0) {
      setUsersToAdd(friendsToAdd);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered text-black rounded-full"
        value={searchTerm}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle border-2 bg-white text-black hover:bg-black hover:text-white"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
