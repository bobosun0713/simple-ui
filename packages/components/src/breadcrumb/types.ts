export interface BreadcrumbProps {
  prepend?: string | number;
  separator?: string | number;
  items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  title?: string | number;
  disabled?: boolean;
  href?: string;
}
