import { create } from "zustand";

interface WalletState {
  isConnected: boolean;
  address: string;
  balance: string;
  connect: () => Promise<void>;
  getAddress: () => Promise<void>;
  getBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  isConnected: false,
  address: "",
  balance: "",

  connect: async () => {
    if (!window.adena) {
      alert("Please Install Adena");
      return;
    }

    const res = await window.adena.AddEstablish("My DApp");

    console.log(res, "res in store");
    if (res.status === "success") {
      set({ isConnected: true });
    } else if (res.type === "ALREADY_CONNECTED") {
      set({ isConnected: true });
      return;
    } else {
      alert(`Connect Fail: ${res.message}`);
    }
  },

  getAddress: async () => {
    if (!window.adena || !get().isConnected) return;

    const res = await window.adena.GetAccount();

    if (res.status === "success") {
      set({ address: res.data.address });
    } else {
      alert(`Getting Address Fail: ${res.message}`);
    }
  },

  getBalance: async () => {
    if (!window.adena || !get().isConnected) return;

    const res = await window.adena.GetAccount();

    if (res.status === "success") {
      const coins = res.data.coins as string;
      const ugnot = parseInt(coins.replace("ugnot", "")) || 0;
      set({ balance: `${ugnot} ugnot` });
    } else {
      alert(`Getting Balace Fail: ${res.message}`);
    }
  },
}));
