'use client';

import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface CountdownState {
  endTime: number | null;
  hasUsedGuestMode: boolean;

  startCountdown: (durationInMinutes: number) => void;
  resetCountdown: () => void;
  getRemainingTime: () => number;
  isCountdownActive: () => boolean;
}

export const useCountdownStore = create(
  persist<CountdownState>(
    (set, get) => ({
      endTime: null,
      hasUsedGuestMode: false,

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
    }),
    {
      name: 'countdown-store',
      partialize: (state) => ({
        endTime: state.endTime,
        hasUsedGuestMode: state.hasUsedGuestMode,
      }),
    }
  )
);
