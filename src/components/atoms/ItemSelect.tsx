import type {
  AvatarFeatureKey,
  AvatarFeatureListValue,
  AvatarFeatureValue,
} from "@src/interfaces";

interface ItemSelectProps<T extends AvatarFeatureKey> {
  options: AvatarFeatureListValue<T>;
  value: AvatarFeatureValue<T>;
  label: T;
  onChange: (feature: T, value: AvatarFeatureValue<T>) => void;
}

export const ItemSelect = <T extends AvatarFeatureKey>({
  options,
  value,
  label,
  onChange,
}: ItemSelectProps<T>) => {
  return (
    <div className="control-group">
      <label htmlFor={label}>{label.toUpperCase()}:</label>
      <select
        value={value}
        id={label}
        onChange={(e) => {
          const result = options[e.target.selectedIndex];
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
