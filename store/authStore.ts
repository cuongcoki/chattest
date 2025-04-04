import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface UserData {
  firstName: string;
  address: string;
  sub: number;
}

interface AuthState {
  accessToken: string | null;
  guestToken: string | null;
  session_Id: any | null;
  userData: UserData | null;
  isGuestMode: boolean;
  setAccessToken: (token: string) => void;
  setGuestToken: (token: string) => void;
  setUser: (userFromServer: any) => void;
  clearAccessToken: () => void;
  clearGuestToken: () => void;
  setSession_id: (session_id: number) => void;
}

const isClient = typeof window !== 'undefined';

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('access_token') || null,
  guestToken: Cookies.get('guest_token') || (isClient ? localStorage.getItem('guestToken') : null),
  session_Id: Cookies.get('session_id') || null,
  userData: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,
  isGuestMode:
    !!Cookies.get('guest_token') || (isClient ? !!localStorage.getItem('guestToken') : false),

  setAccessToken: (token: string) => {
    set({ accessToken: token });
    Cookies.set('access_token', token, { expires: 7 });
  },

  setGuestToken: (token: string) => {
    set({ guestToken: token, isGuestMode: true });
    Cookies.set('guest_token', token, { expires: 1 / 48 }); // 30 phút
    if (isClient) {
      localStorage.setItem('guestToken', token);
    }
  },

  setSession_id: (ssID: number) => {
    set({ session_Id: ssID });
    Cookies.set('session_id', ssID.toString(), { expires: 7 });
  },

  setUser: (userFromServer: any) => {
    const user: UserData = {
      firstName: userFromServer.ho_va_ten,
      address: userFromServer.noi_o,
      sub: userFromServer.sub,
    };
    set({ userData: user });
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
  },

  clearAccessToken: () => {
    set({ accessToken: null, userData: null });
    Cookies.remove('access_token');
    Cookies.remove('user');
  },

  clearGuestToken: () => {
    set({ guestToken: null, isGuestMode: false });
    Cookies.remove('guest_token');
    if (isClient) {
      localStorage.removeItem('guestToken');
      localStorage.removeItem('hasUsedGuestMode');
      localStorage.removeItem('guestCountdownEnd');
    }
  },
}));
