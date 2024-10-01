import { create } from "zustand";

const useUsersToAdd = create((set) => ({
  usersToAdd: [],
  setUsersToAdd: (users) => set({ usersToAdd: users }),
}));

export default useUsersToAdd;
