export type NotificationTypes = "success" | "warning" | "info" | "danger";

export type NotificationProps = {
  id?: number | string;
  type?: NotificationTypes;
  summary?: number | string;
  message?: number | string;
  duration?: number | string;
  spacing?: number | string;
  position?: string;
  slots?: object | null;
};
