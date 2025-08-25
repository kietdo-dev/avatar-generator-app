import type { FC } from "react";

interface ExpressionLabelProps {
  expression: string;
}

const emojiMap: Record<string, string> = {
  Excited: "😄",
  Happy: "😊",
  Angry: "😠",
  Sleepy: "😴",
  Sad: "😢",
  Funny: "😂",
  Surprised: "😲",
  Neutral: "😐",
};

export const ExpressionLabel: FC<ExpressionLabelProps> = ({ expression }) => (
  <div>
    <div className="expression-text">
      {emojiMap[expression] && emojiMap[expression]}
      {` ${expression}`}
    </div>
  </div>
);
