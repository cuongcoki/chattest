import { create } from 'zustand';

interface ChatState {
  sessionId: number | null; 
  setSessionId: (id: number) => void; 
  clearSession: () => void; 
  
}

export const useChatStore = create<ChatState>((set) => ({
  sessionId: null, // ban đầu không có session nào

  // Hàm set session_id mới
  setSessionId: (id) => set(() => ({ sessionId: id })),

  // Hàm reset session_id
  clearSession: () => set(() => ({ sessionId: null })),
}));
