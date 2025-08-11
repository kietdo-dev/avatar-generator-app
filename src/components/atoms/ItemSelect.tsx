import type { AvatarOptions } from "@src/interfaces";
import type { FC } from "react";

interface ItemSelectProps {
  options: string[];
  value: string;
  label: keyof AvatarOptions;
  onChange: (feature: keyof AvatarOptions, value: string) => void;
}

export const ItemSelect: FC<ItemSelectProps> = ({
  options,
  value,
  label,
  onChange,
}) => {
  return (
    <div className="control-group">
      <label>{label.toUpperCase()}:</label>
      <select value={value} onChange={(e) => onChange(label, e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
