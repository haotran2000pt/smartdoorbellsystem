import { Device } from "./device.type";

export enum NotificationType {
  SYSTEM,
  CAMERA,
}

export interface Notification {
  id: string;
  type: NotificationType;
  imageUrl?: string;
  title: string;
  description: string;
  device?: Device;
  createdAt: Date;
  read: boolean;
}
