export interface SkeletonProps {
  rows?: number;
  loading?: boolean;
  animated?: boolean;
}

export interface SkeletonItemProps extends Pick<SkeletonProps, "animated"> {
  variant?: "h" | "p" | "circle" | "image";
}
