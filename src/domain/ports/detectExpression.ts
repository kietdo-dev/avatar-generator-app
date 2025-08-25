import type { AvatarOptions } from "@src/interfaces";

/**
 * Maps avatar options to a facial expression label.
 * This is a simple rule-based mapping. Adjust as needed for more nuance.
 */
export function detectExpression(options: AvatarOptions): string {
  // Rule-based expression detection using strategy pattern
  const expressionRules = [
    {
      expression: "Excited",
      conditions: { mouth: "smile", eyes: "big", eyebrows: "raised" },
    },
    {
      expression: "Happy",
      conditions: { mouth: "smile", eyes: "normal" },
    },
    {
      expression: "Angry",
      conditions: [{ mouth: "frown" }, { eyebrows: "angry" }],
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
    if (Array.isArray(rule.conditions)) {
      // OR logic - any condition matches
      if (
        rule.conditions.some((condition) =>
          Object.entries(condition).every(
            ([key, value]) => options[key as keyof AvatarOptions] === value
          )
        )
      ) {
        return rule.expression;
      }
    } else {
      // AND logic - all conditions must match
      if (
        Object.entries(rule.conditions).every(
          ([key, value]) => options[key as keyof AvatarOptions] === value
        )
      ) {
        return rule.expression;
      }
    }
  }
  return "Neutral";
}
