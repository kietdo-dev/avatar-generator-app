import { useState } from "react";

import { Items } from "@src/constants/items";
import type { AvatarFeatureKey, AvatarOptions } from "@src/interfaces";

export function useAvatarOptionsState(initial?: Partial<AvatarOptions>) {
  // Create default options by taking first item from each category
  const createDefaults = () => {
    const defaults: Record<string, string> = {};
    Object.keys(Items).forEach((key) => {
      const keyWithType = key as AvatarFeatureKey;
      defaults[keyWithType] = Items[keyWithType][0];
    });
    return defaults as AvatarOptions;
  };

  // Merge and validate initial values
  const getInitialOptions = (): AvatarOptions => {
    const defaults = createDefaults();
    if (!initial) return defaults;

    const result = { ...defaults };
    for (const [key, value] of Object.entries(initial)) {
      const typedKey = key as AvatarFeatureKey;
      const allowedValues = Items[typedKey] as unknown as string[];
      if (allowedValues?.includes(value)) {
        (result as Record<string, string>)[typedKey] = value;
      }
    }
    return result;
  };

  const [avatarOptions, setAvatarOptions] =
    useState<AvatarOptions>(getInitialOptions);

  const updateAvatarOption = (feature: keyof AvatarOptions, value: string) => {
    setAvatarOptions((prev) => ({
      ...prev,
      [feature]: value,
    }));
  };

  return { avatarOptions, setAvatarOptions, updateAvatarOption };
}
