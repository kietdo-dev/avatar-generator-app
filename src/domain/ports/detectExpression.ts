import type {
  AvatarFeatureKey,
  AvatarFeatureValue,
  AvatarOptions,
} from "@src/interfaces";

/**
 * Maps avatar options to a facial expression label.
 * This is a simple rule-based mapping. Adjust as needed for more nuance.
 */
export function detectExpression(options: AvatarOptions): string {
  type Condition = Partial<
    Record<
      AvatarFeatureKey,
      | AvatarFeatureValue<AvatarFeatureKey>
      | AvatarFeatureValue<AvatarFeatureKey>[]
    >
  >;
  type ExpressionRule = {
    expression: string;
    conditions: Condition;
  };
  // Rule-based expression detection using strategy pattern
  const expressionRules: ExpressionRule[] = [
    {
      expression: "Excited",
      conditions: {
        mouth: ["smile", "laugh", "surprised"],
        eyes: "big",
        eyebrows: "raised",
      },
    },
    {
      expression: "Happy",
      conditions: {
        mouth: ["smile", "neutral"],
        eyes: "normal",
      },
    },
    {
      expression: "Angry",
      conditions: { mouth: "frown", eyebrows: "angry" },
    },
    {
      expression: "Sleepy",
      conditions: { mouth: "neutral", eyes: "sleepy" },
    },
    {
      expression: "Sad",
      conditions: { mouth: "frown", eyes: "small" },
    },
    {
      expression: "Funny",
      conditions: { mouth: "laugh" },
    },
    {
      expression: "Surprised",
      conditions: { mouth: "surprised" },
    },
  ];

  for (const rule of expressionRules) {
    // AND logic - all conditions must match
    const matches = Object.entries(rule.conditions).every(([key, value]) => {
      const avatarValue = options[key as keyof AvatarOptions];
      if (Array.isArray(value)) {
        return (value as string[]).includes(avatarValue as string);
      }
      return avatarValue === value;
    });

    if (matches) {
      return rule.expression;
    }
  }
  return "Neutral";
}
