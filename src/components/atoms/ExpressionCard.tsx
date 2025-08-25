import type { FC, ReactNode } from "react";

import "./ExpressionLabel.css";

interface ExpressionCardProps {
  children: ReactNode;
}

export const ExpressionCard: FC<ExpressionCardProps> = ({ children }) => (
  <div className="expression-label-card">{children}</div>
);
