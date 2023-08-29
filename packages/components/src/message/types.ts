export type MessageProps = {
  visible?: boolean;
  type?: string;
  message?: number | string;
  duration?: number | string;
  offsetTop?: number | string;
  eleSpacing?: number | string;
  showClose?: boolean;
  onClose?: () => void;
};
