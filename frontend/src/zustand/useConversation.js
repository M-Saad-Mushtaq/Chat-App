import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  conversations: [],
  messages: [],

  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setConversations: (conversations) => set({ conversations }),
  setMessages: (messages) => set({ messages }),

  removeConversation: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (conv) => conv._id !== conversationId
      ),
    })),
}));

export default useConversation;
