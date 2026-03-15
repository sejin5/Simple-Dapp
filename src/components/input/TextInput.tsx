import { type InputFieldProps } from "../../types/input";
import { InputField } from "./InputField";

export const TextInput = ({ label, ...props }: InputFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] text-gray-700" htmlFor={label}>
      {label}
    </label>
    <div className="flex border border-black rounded-md">
      <InputField id={label} {...props} />
    </div>
  </div>
);
