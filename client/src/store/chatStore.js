import { create } from 'zustand';

const useChatStore = create((set) => ({
  rooms: [],
  currentRoom: null,
  messages: [],
  users: [],
  directMessages: {},
  notifications: [],
  onlineUsers: new Set(),
  typingUsers: new Set(),

  setRooms: (rooms) => set({ rooms }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setMessages: (messages) => set({ messages }),
  setUsers: (users) => set({ users }),
  setNotifications: (notifications) => set({ notifications }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),

  addOnlineUser: (userId) => set((state) => ({
    onlineUsers: new Set([...state.onlineUsers, userId])
  })),

  removeOnlineUser: (userId) => set((state) => {
    const newSet = new Set(state.onlineUsers);
    newSet.delete(userId);
    return { onlineUsers: newSet };
  }),

  addTypingUser: (userId) => set((state) => ({
    typingUsers: new Set([...state.typingUsers, userId])
  })),

  removeTypingUser: (userId) => set((state) => {
    const newSet = new Set(state.typingUsers);
    newSet.delete(userId);
    return { typingUsers: newSet };
  }),

  setDirectMessage: (userId, message) => set((state) => ({
    directMessages: {
      ...state.directMessages,
      [userId]: [...(state.directMessages[userId] || []), message]
    }
  }))
}));

export default useChatStore;
