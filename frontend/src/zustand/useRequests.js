import { create } from "zustand";

const useRequests = create((set) => ({
  requests: [],
  setRequests: (Requests) => set({ requests: Requests }),
}));

export default useRequests;
