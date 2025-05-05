import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {UserInfo} from "../typing";

type AuthState = {
  userInfo: UserInfo | null;
  setAuth: (userInfo: UserInfo) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userInfo: null,
      setAuth: (userInfo) => set(() => ({ userInfo })),
      clearAuth: () => set(() => ({ userInfo: null })),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
);