import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface UserData {
  firstName: string;
  address: string;
  sub: number;
}

interface AuthState {
  accessToken: string | null;
  session_Id: any | null
  userData: UserData | null;
  setAccessToken: (token: string) => void;
  setUser: (userFromServer: any) => void;
  clearAccessToken: () => void;
  setSession_id:(session_id:number) =>void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('access_token') || null,
  session_Id: Cookies.get('session_id') || null,
  userData: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,

  setAccessToken: (token: string) => {
    set({ accessToken: token });
    Cookies.set('access_token', token, { expires: 7 });
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
}));
