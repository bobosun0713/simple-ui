export interface BreadcrumbProps {
  prepend?: string | number;
  separator?: string | number;
  items: BreadcrumbItem[] | string[];
}

export interface BreadcrumbItem {
  title?: string | number;
  disabled?: boolean;
  href?: string;
}
