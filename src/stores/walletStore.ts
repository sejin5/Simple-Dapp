import { create } from "zustand";
import { useToastStore } from "./toastStore";

interface WalletState {
  isConnected: boolean;
  address: string;
  balance: string;
  isLoadingAddress: boolean;
  isLoadingBalance: boolean;
  isLoadingSend: boolean;
  connect: () => Promise<void>;
  getAddress: () => Promise<void>;
  getBalance: () => Promise<void>;
  sendGnot: (toAddress: string, amount: string, unit: string) => Promise<void>;
}

const { showToast } = useToastStore.getState();

const handleWalletLocked = async (message: string) => {
  alert(`${message} Try again`);
  await window.adena?.AddEstablish("Adena");
};

const fetchAddress = async (): Promise<string | null> => {
  const res = await window.adena!.GetAccount();

  if (res.status === "success") return res.data.address;

  if (res.type === "WALLET_LOCKED") {
    await handleWalletLocked(res.message ?? "");
  } else {
    alert(`Getting Account Fail: ${res.message}`);
  }
  return null;
};

export const useWalletStore = create<WalletState>((set, get) => ({
  isConnected: false,
  address: "",
  balance: "",
  isLoadingAddress: false,
  isLoadingBalance: false,
  isLoadingSend: false,

  connect: async () => {
    if (!window.adena) {
      window.open("https://adena.app/", "_blank");
      return;
    }

    const res = await window.adena.AddEstablish("Adena");

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
    set({ isLoadingAddress: true });

    try {
      const address = await fetchAddress();
      if (address) set({ address });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert(`Getting Address Fail: ${message}`);
    } finally {
      set({ isLoadingAddress: false });
    }
  },

  getBalance: async () => {
    if (!window.adena || !get().isConnected) return;
    set({ isLoadingBalance: true });

    try {
      const res = await window.adena.GetAccount();

      if (res.status === "success") {
        const coins = res.data.coins as string;
        const ugnot = coins.replace("ugnot", " ugnot") || "0 ugnot";
        set({ balance: ugnot });
      } else if (res.type === "WALLET_LOCKED") {
        await handleWalletLocked(res.message ?? "");
      } else {
        alert(`Getting Balace Fail: ${res.message}`);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert(`Getting Address Fail: ${message}`);
    } finally {
      set({ isLoadingBalance: false });
    }
  },

  sendGnot: async (toAddress: string, amount: string, unit: string) => {
    if (!window.adena || !get().isConnected) return;
    set({ isLoadingSend: true });

    try {
      const address = get().address || (await fetchAddress());
      if (!address) return;

      if (unit === "gnot") {
        amount = String(parseInt(amount) * 1000000);
      }
      const ugnot = amount + "ugnot";

      const res = await window.adena.DoContract({
        messages: [
          {
            type: "/bank.MsgSend",
            value: {
              from_address: address,
              to_address: toAddress,
              amount: ugnot,
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
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert(`Getting Address Fail: ${message}`);
    } finally {
      set({ isLoadingSend: false });
    }
  },
}));
