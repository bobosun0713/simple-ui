export interface MessageProps {
  width?: string | number;
  offsetTop?: string | number;
  eleSpacing?: string | number;
  duration?: string | number;
  showClose?: boolean;
}
export interface MessageCommand {
  type?: string;
  message?: string | number;
}
export interface MessageContentProps extends MessageCommand, Omit<MessageProps, "width"> {
  id?: string | number;
}
