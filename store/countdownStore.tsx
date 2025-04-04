'use client';

import { create } from "zustand";

interface CountdownState {
  endTime: number | null;
  hasUsedGuestMode: boolean;

  startCountdown: (durationInMinutes: number) => void;
  resetCountdown: () => void;
  getRemainingTime: () => number;
  isCountdownActive: () => boolean;
}

// Hàm để lấy giá trị ban đầu từ localStorage (nếu có)
const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const storedEndTime = localStorage.getItem('guestCountdownEnd');
    const storedHasUsedGuestMode = localStorage.getItem('hasUsedGuestMode');
    
    return {
      endTime: storedEndTime ? parseInt(storedEndTime, 10) : null,
      hasUsedGuestMode: storedHasUsedGuestMode === 'true',
    };
  }
  
  return {
    endTime: null,
    hasUsedGuestMode: false,
  };
};

export const useCountdownStore = create<CountdownState>((set, get) => ({
  ...getInitialState(),

  startCountdown: (durationInMinutes: number) => {
    const endTime = Math.floor(Date.now() / 1000) + (durationInMinutes * 60);

    // Cập nhật localStorage nếu đang ở client
    if (typeof window !== 'undefined') {
      localStorage.setItem('guestCountdownEnd', endTime.toString());
      localStorage.setItem('hasUsedGuestMode', 'true');
    }

    set({
      endTime,
      hasUsedGuestMode: true,
    });
  },

  resetCountdown: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('guestCountdownEnd');
      localStorage.removeItem('hasUsedGuestMode');
    }

    set({
      endTime: null,
      hasUsedGuestMode: false,
    });
  },

  getRemainingTime: () => {
    const { endTime } = get();
    if (!endTime) return 0;

    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(0, endTime - currentTime);
  },

  isCountdownActive: () => {
    const { endTime } = get();
    if (!endTime) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return endTime > currentTime;
  },
}));