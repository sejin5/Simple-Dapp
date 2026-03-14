interface InputProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({ label, value, onChange, placeholder, disabled = false }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] text-gray-700">{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-[12px] border border-black rounded-md px-3 py-2 outline-none focus:border-active"
        disabled={disabled}
      />
    </div>
  );
};
