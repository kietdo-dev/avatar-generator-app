import { Items } from "@src/constants/items";
import type {
  AvatarFeatureKey,
  AvatarFeatureListValue,
  AvatarFeatureValue,
  AvatarOptions,
} from "@src/interfaces";

export function useAvatarRandomizer(
  setAvatarOptions: (opts: AvatarOptions) => void
) {
  const onRandomItem = <T extends AvatarFeatureKey>(
    items: AvatarFeatureListValue<T>
  ): AvatarFeatureValue<T> => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const onRandomizeAvatar = () => {
    setAvatarOptions({
      eyes: onRandomItem<"eyes">(Items.eyes),
      nose: onRandomItem<"nose">(Items.nose),
      mouth: onRandomItem<"mouth">(Items.mouth),
      hairStyle: onRandomItem<"hairStyle">(Items.hairStyle),
      hairColor: onRandomItem<"hairColor">(Items.hairColor),
      skinColor: onRandomItem<"skinColor">(Items.skinColor),
      eyebrows: onRandomItem<"eyebrows">(Items.eyebrows),
    });
  };

  return { onRandomizeAvatar };
}
