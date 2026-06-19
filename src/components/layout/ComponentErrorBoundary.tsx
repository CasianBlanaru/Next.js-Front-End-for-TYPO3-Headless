import type { ReactNode } from "react";

interface ComponentErrorBoundaryProps {
  children: ReactNode;
}

export default function ComponentErrorBoundary({
  children,
}: ComponentErrorBoundaryProps) {
  return <>{children}</>;
}
