import { cn } from "../utils";
import { useToastStore } from "../stores/toastStore";

export const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={cn(
            "px-4 py-3 rounded-lg bg-white cursor-pointer text-[16px]",
            "shadow-lg transition-all duration-300 border border-gray-200",
            toast.isLeaving ? "animate-slide-out" : "animate-slide-in"
          )}
        >
          <p
            className={`font-bold ${toast.type === "success" ? "text-green-600" : "text-red-500"}`}
          >
            {toast.message}
          </p>
          {toast.variant === "transaction" && <p>txHash: {toast.txhash}</p>}
        </div>
      ))}
    </div>
  );
};
