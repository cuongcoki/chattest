import { create } from "zustand";
import Cookies from "js-cookie";

export interface GuestData {
  access_token: string | null;
  guest_token: string | null;
  session_id: number | null;
  role: string | null;
  isGuestMode: boolean;
  guestData: {
    guest_token: string | null;
    session_id: number | null;
    role: string | null;
    isGuestMode: boolean;
  } | null;
  setGuestData: (data: Partial<GuestData>) => void;
  clearGuestData: () => void;
}

export const useGuestStore = create<GuestData>((set) => ({
  access_token: Cookies.get("access_token") || null,
  guest_token: Cookies.get("guest_token") || null,
  session_id: Cookies.get("session_id") ? Number(Cookies.get("session_id")) : null,
  role: Cookies.get("role") || "guest",
  isGuestMode: !!Cookies.get("guest_token"),
  guestData: {
    guest_token: Cookies.get("guest_token") || null,
    session_id: Cookies.get("session_id") ? Number(Cookies.get("session_id")) : null,
    role: Cookies.get("role") || "guest",
    isGuestMode: !!Cookies.get("guest_token"),
  },

  setGuestData: (data) => {
    if (data.access_token) {
      Cookies.set("guest_token", data.access_token, { expires: 1 / 48 });
      localStorage.setItem("guest_token", data.access_token);
    }

    if (data.session_id !== undefined && data.session_id !== null) {
      Cookies.set("session_id", data.session_id.toString(), { expires: 7 });
      localStorage.setItem("session_id", data.session_id.toString());
    }

    if (data.role) {
      Cookies.set("role", data.role, { expires: 7 });
      localStorage.setItem("role", data.role);
    }

    set((state) => {
      const updatedGuestData = {
        guest_token: data.access_token || state.guest_token,
        session_id: data.session_id ?? state.session_id,
        role: data.role || state.role,
        isGuestMode: !!(data.access_token || Cookies.get("guest_token") || localStorage.getItem("guest_token")),
      };

      return {
        ...state,
        ...data,
        isGuestMode: updatedGuestData.isGuestMode,
        guestData: updatedGuestData,
      };
    });
  },

  clearGuestData: () => {
    Cookies.remove("guest_token");
    Cookies.remove("session_id");
    Cookies.remove("role");
    localStorage.removeItem("guest_token");
    localStorage.removeItem("session_id");
    localStorage.removeItem("role");

    set({
      access_token: null,
      guest_token: null,
      session_id: null,
      role: "guest",
      isGuestMode: false,
      guestData: null,
    });
  },
}));
