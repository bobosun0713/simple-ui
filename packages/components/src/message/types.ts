export interface MessageProps {
  offsetTop?: string | number;
}

export interface MessageCommand {
  type?: string;
  message?: string | number;
  duration?: string | number;
  eleSpacing?: string | number;
  showClose?: boolean;
}

export interface MessageContentProps extends MessageCommand {
  id?: string | number;
}

export interface MessageTypeCommand extends Omit<MessageCommand, "type"> {}
