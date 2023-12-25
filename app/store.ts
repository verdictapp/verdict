import { create } from "zustand";

export const useStore = create<{ isLoggedIn: boolean }>((set) => ({
  isLoggedIn: false,
}));
