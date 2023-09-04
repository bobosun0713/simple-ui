export type NotificationProps = {
  type?: string;
  title?: number | string;
  message?: number | string;
  duration?: number | string;
  offsetTop?: number | string;
  eleSpacing?: number | string;
  showClose?: boolean;
  position?: string;
  onClose?: () => void;
  onClear?: () => void;
};
