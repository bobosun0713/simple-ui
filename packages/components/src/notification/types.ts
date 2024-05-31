import type { h } from "vue";

export type MessageHRender = Parameters<typeof h>[2];
export type NotificationTypes = "success" | "warning" | "info" | "error";
export type NotificationPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface NotificationProps {
  width?: string | number;
  offsetTop?: string | number;
  eleSpacing?: string | number;
  duration?: string | number;
  position?: NotificationPlacement;
}

export interface NotificationContentProps extends Pick<NotificationProps, "duration"> {
  id?: number | string;
  type?: NotificationTypes;
  title?: MessageHRender;
  message?: MessageHRender;
  cancel?: MessageHRender;
}

export type NotificationServiceProps = NotificationProps;

export type NotificationServiceOpen = Omit<NotificationContentProps, "id">;

export type NotificationServiceCall = Omit<NotificationContentProps, "type">;

export interface NotificationReturnType {
  open: (data: NotificationServiceOpen) => void;
  info: (data: NotificationServiceCall) => void;
  success: (data: NotificationServiceCall) => void;
  warning: (data: NotificationServiceCall) => void;
  error: (data: NotificationServiceCall) => void;
}
