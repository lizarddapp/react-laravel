import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Toast {
  type: "success" | "fail";
  msg: string;
}

interface ToastState {
  toasts: Toast | null;
  setToast: (msg: Toast | null) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: null,
  setToast: (msg) => {
    set({ toasts: msg });
  },
}));

interface TokenState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStorage = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        set({ token });
      },
    }),
    { name: "storage" }
  )
);
