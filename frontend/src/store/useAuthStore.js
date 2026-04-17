import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (username, password) => {
        try {
          const params = { username, password };
          const response = await api.post('/auth/login', params);
          set({
            user: {
              _id: response.data._id,
              username: response.data.username,
              role: response.data.role,
              name: response.data.name
            },
            token: response.data.token,
            isAuthenticated: true
          });
          return { success: true };
        } catch (error) {
          return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
      },

      register: async (userData) => {
        try {
          const response = await api.post('/auth/register', userData);
          set({
            user: {
              _id: response.data._id,
              username: response.data.username,
              role: response.data.role,
              name: response.data.name,
              uniqueCode: response.data.uniqueCode
            },
            token: response.data.token,
            isAuthenticated: true
          });
          return { success: true, uniqueCode: response.data.uniqueCode };
        } catch (error) {
          return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'rapid-relief-auth',
    }
  )
);
