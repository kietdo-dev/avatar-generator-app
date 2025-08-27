import type { FC } from "react";

import type { AvatarOptions } from "@src/interfaces";

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
      <label htmlFor={label}>{label.toUpperCase()}:</label>
      <select
        value={value}
        id={label}
        onChange={(e) => {
          const result = e.target.options[e.target.selectedIndex].value;
          onChange(label, result);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
