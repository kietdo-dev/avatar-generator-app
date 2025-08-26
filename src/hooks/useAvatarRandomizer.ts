import { Items } from "@src/constants/items";
import type { AvatarOptions } from "@src/interfaces";

export function useAvatarRandomizer(
  setAvatarOptions: (opts: AvatarOptions) => void
) {
  const onRandomItem = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const onRandomizeAvatar = () => {
    setAvatarOptions({
      eyes: onRandomItem(Items.eyes),
      nose: onRandomItem(Items.nose),
      mouth: onRandomItem(Items.mouth),
      hairStyle: onRandomItem(Items.hairStyle),
      hairColor: onRandomItem(Items.hairColor),
      skinColor: onRandomItem(Items.skinColor),
      eyebrows: onRandomItem(Items.eyebrows),
    });
  };

  return { onRandomizeAvatar };
}
