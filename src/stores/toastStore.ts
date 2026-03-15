import { create } from "zustand";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
  txhash?: string;
  isLeaving?: boolean;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type: "success" | "error", txhash?: string) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (message, type, txhash = "-") => {
    const id = Date.now();

    set((state) => ({
      toasts: [...state.toasts, { id, message, txhash, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((t) => (t.id === id ? { ...t, isLeaving: true } : t)),
      }));
    }, 2700);

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
