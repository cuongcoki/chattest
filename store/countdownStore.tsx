import { create } from "zustand";

interface CountdownState {
  // Unix timestamp for when the countdown ends (in seconds)
  endTime: number | null;
  
  // Whether the guest mode has been used
  hasUsedGuestMode: boolean;
  
  // Initialize the countdown with an end time (in seconds)
  startCountdown: (durationInMinutes: number) => void;
  
  // Reset the countdown and guest mode status
  resetCountdown: () => void;
  
  // Get remaining time in seconds
  getRemainingTime: () => number;
  
  // Check if countdown is active
  isCountdownActive: () => boolean;
}

export const useCountdownStore = create<CountdownState>((set, get) => ({
  // Initialize from localStorage if available
  endTime: localStorage.getItem('guestCountdownEnd') 
    ? parseInt(localStorage.getItem('guestCountdownEnd')!, 10) 
    : null,
    
  hasUsedGuestMode: localStorage.getItem('hasUsedGuestMode') === 'true',
  
  startCountdown: (durationInMinutes) => {
    const endTime = Math.floor(Date.now() / 1000) + (durationInMinutes * 60);
    localStorage.setItem('guestCountdownEnd', endTime.toString());
    localStorage.setItem('hasUsedGuestMode', 'true');
    
    set({
      endTime,
      hasUsedGuestMode: true
    });
  },
  
  resetCountdown: () => {
    localStorage.removeItem('guestCountdownEnd');
    localStorage.removeItem('hasUsedGuestMode');
    
    set({
      endTime: null,
      hasUsedGuestMode: false
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
  }
}));