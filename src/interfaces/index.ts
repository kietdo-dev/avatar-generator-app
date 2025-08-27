import type { Items } from "@src/constants/items";

export type AvatarFeatureKey = keyof typeof Items;
export type AvatarFeature = (typeof Items)[AvatarFeatureKey][number];

// Strongly typed individual feature values
export type EyesValue = (typeof Items)["eyes"][number];
export type NoseValue = (typeof Items)["nose"][number];
export type MouthValue = (typeof Items)["mouth"][number];
export type HairStyleValue = (typeof Items)["hairStyle"][number];
export type HairColorValue = (typeof Items)["hairColor"][number];
export type SkinColorValue = (typeof Items)["skinColor"][number];
export type EyebrowsValue = (typeof Items)["eyebrows"][number];

// Main type with explicit property types
export type AvatarOptions = {
  eyes: EyesValue;
  nose: NoseValue;
  mouth: MouthValue;
  hairStyle: HairStyleValue;
  hairColor: HairColorValue;
  skinColor: SkinColorValue;
  eyebrows: EyebrowsValue;
};

// Utility types for better reusability
export type PartialAvatarOptions = Partial<AvatarOptions>;
export type AvatarFeatureListValue<K extends AvatarFeatureKey> =
  (typeof Items)[K];
export type AvatarFeatureValue<K extends AvatarFeatureKey> =
  AvatarFeatureListValue<K>[number];

// Helper to validate if a value is valid for a specific feature
export type ValidateFeatureValue<K extends AvatarFeatureKey, V> =
  V extends AvatarFeatureValue<K> ? V : never;

// Type for feature update functions
export type AvatarFeatureUpdater = <K extends AvatarFeatureKey>(
  feature: K,
  value: AvatarFeatureValue<K>
) => void;
