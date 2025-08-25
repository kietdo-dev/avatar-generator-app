import type { FC } from "react";

interface ExpressionLabelProps {
  expression: string;
}

export const ExpressionLabel: FC<ExpressionLabelProps> = ({ expression }) => (
  <div>
    <div className="expression-text">
      {expression === "Excited" && "😄"}
      {expression === "Happy" && "😊"}
      {expression === "Angry" && "😠"}
      {expression === "Sleepy" && "😴"}
      {expression === "Sad" && "😢"}
      {expression === "Funny" && "😂"}
      {expression === "Surprised" && "😲"}
      {expression === "Neutral" && "😐"}
      {` ${expression}`}
    </div>
  </div>
);
