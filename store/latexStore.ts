import { create } from 'zustand';

interface LatexState {
  latexValue: string;
  setLatexValue: (value: string) => void;
}

export const useLatexStore = create<LatexState>((set) => ({
  latexValue: '',
  setLatexValue: (value) => set({ latexValue: value }),
}));
