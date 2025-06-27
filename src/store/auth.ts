import { deleteCookie, setCookie } from "cookies-next/client";
import { create } from "zustand";

type AuthStore = {
  token: string | null;
  open: boolean;
  setToken: (newToken: string | null) => void;
  setOpen: (newOpen: boolean) => void;
};

export const useAuth = create<AuthStore>()((set) => ({
  token: null,
  open: false,
  setOpen: (newOpen) => set((state) => ({ ...state, open: newOpen })),
  setToken: (newToken) =>
    set((state) => {
      if (newToken) {
        setCookie("token", newToken);
      } else {
        deleteCookie("token");
      }
      return { ...state, token: newToken };
    }),
}));
