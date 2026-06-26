import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true, error: null });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),

  restoreAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      });
    }
  }
}));

export default useAuthStore;
