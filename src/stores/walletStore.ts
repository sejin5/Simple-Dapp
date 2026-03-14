import { create } from "zustand";
import { useToastStore } from "./toastStore";

interface WalletState {
  isConnected: boolean;
  address: string;
  balance: string;
  connect: () => Promise<void>;
  getAddress: () => Promise<void>;
  getBalance: () => Promise<void>;
  sendGnot: (toAddress: string, amount: string) => Promise<void>;
}

const { showToast } = useToastStore.getState();

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

  sendGnot: async (toAddress: string, amount: string) => {
    if (!window.adena || !get().isConnected) return;

    const accountRes = await window.adena.GetAccount();

    if (accountRes.status !== "success") {
      alert("Getting Address Failed");
      return;
    }

    const fromAddress = accountRes.data.address;

    const ugnot = amount.replace("ugnot", "");

    const res = await window.adena.DoContract({
      messages: [
        {
          type: "/bank.MsgSend",
          value: {
            from_address: fromAddress,
            to_address: toAddress,
            amount: `${ugnot}ugnot`,
          },
        },
      ],
      memo: "",
    });

    if (res.status === "success") {
      showToast("Transaction Success", "success", res.data.hash);
    } else if (res.type === "TRANSACTION_REJECTED") {
      alert(res.message);
    } else {
      showToast("Transaction Failed", "error", res.data.hash);
    }
  },
}));
