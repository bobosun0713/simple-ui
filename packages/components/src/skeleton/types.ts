export interface SkeletonProps {
  rows?: number;
  loading?: boolean;
  animated?: boolean;
}

export interface SkeletonItemProps {
  variant?: "h" | "p" | "circle" | "image";
}
