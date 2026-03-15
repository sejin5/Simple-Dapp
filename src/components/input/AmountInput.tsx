import { type AmountInputProps } from "../../types/input";
import { InputField } from "./InputField";

export const AmountInput = ({ label, unit, onUnitChange, ...props }: AmountInputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-[12px] text-gray-700" htmlFor={label}>
      {label}
    </label>
    <div className="flex border border-black rounded-md">
      <InputField id={label} {...props} />
      <select
        className="text-[12px]"
        value={unit}
        onChange={(e) => onUnitChange(e.target.value as "ugnot" | "gnot")}
        disabled={props.disabled}
      >
        <option value="ugnot">ugnot</option>
        <option value="gnot">GNOT</option>
      </select>
    </div>
  </div>
);
