import { cn } from "../utils";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({ onClick, disabled = false, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full text-[16px] text-white font-medium py-2 px-4 rounded-md transition-colors",
        disabled ? "bg-inactive" : "bg-active cursor-pointer"
      )}
    >
      {children}
    </button>
  );
};
