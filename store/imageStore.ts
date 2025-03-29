import { create } from "zustand";

interface ImageStore {
    imageFile: File | null;
    preview: string | ArrayBuffer | null;
    setImageFile: (file: File | null) => void;
    setPreview: (preview: string | ArrayBuffer | null) => void;
    removeImage: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
    imageFile: null,
    preview: null,
    setImageFile: (file) => set({ imageFile: file }),
    setPreview: (preview) => set({ preview }),
    removeImage: () => set({ imageFile: null, preview: null }), 
}));
