export interface InputFieldProps {
  label?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

export interface AmountInputProps extends InputFieldProps {
  min: number;
  unit: "ugnot" | "gnot";
  onUnitChange: (unit: "ugnot" | "gnot") => void;
}
