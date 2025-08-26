import { useState } from "react";

import { Items } from "@src/constants/items";
import type { AvatarOptions } from "@src/interfaces";

export function useAvatarOptionsState(initial?: Partial<AvatarOptions>) {
  const safeInitial = initial ?? {};
  // Build a valid default AvatarOptions object from Items
  const defaultOptions = Object.fromEntries(
    Object.entries(Items).map(([key, arr]) => [key, arr[0]])
  ) as AvatarOptions;

  // Merge initial with defaults, but validate each value
  const merged: AvatarOptions = Object.fromEntries(
    Object.entries(defaultOptions).map(([key, defVal]) => {
      const val = safeInitial[key as keyof AvatarOptions];
      const allowed = Items[key as keyof AvatarOptions];
      return [key, allowed.includes(val as string) ? val : defVal];
    })
  ) as AvatarOptions;

  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(merged);

  const updateAvatarOption = (feature: keyof AvatarOptions, value: string) => {
    setAvatarOptions((prev) => ({
      ...prev,
      [feature]: value,
    }));
  };

  return { avatarOptions, setAvatarOptions, updateAvatarOption };
}
