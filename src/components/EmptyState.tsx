import type { ReactNode } from "react";

const EmptyState = ({ children }: { children: ReactNode }) => (
  <div className="empty-state">{children}</div>
);

export default EmptyState;
