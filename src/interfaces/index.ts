import type { Items } from "@src/constants/items";

export type AvatarFeatureKey = keyof typeof Items;
export type AvatarFeature = (typeof Items)[AvatarFeatureKey][number];

export type AvatarOptions = {
  [K in AvatarFeatureKey]: (typeof Items)[K][number];
};
