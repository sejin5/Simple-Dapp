import { create } from "zustand";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
  txhash?: string;
  isLeaving?: boolean;
  variant: "default" | "transaction";
}

interface ToastState {
  toasts: Toast[];
  showToast: (
    message: string,
    type: "success" | "error",
    txhash?: string,
    variant?: "default" | "transaction"
  ) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (message, type, txhash = "-", variant = "default") => {
    const id = Date.now();

    set((state) => ({
      toasts: [...state.toasts, { id, message, txhash, type, variant }],
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
