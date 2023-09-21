import type { NotificationTypes } from "./types";

export const notificationDefault = {
  type: "success" as NotificationTypes,
  summary: "Message",
  message: "Message Content",
  duration: 2500,
  spacing: 10,
  position: "left"
};
