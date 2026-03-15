import { type InputFieldProps } from "../../types/input";

export const InputField = ({ ...props }: InputFieldProps) => {
  return (
    <input className="text-[12px] px-3 py-2 outline-none grow-2 focus:border-active" {...props} />
  );
};
