import { User } from "./user.type";

export interface Device {
  name: string;
  createdDate: Date;
  id: string;
  notificationCounts: number;
  connectedUsers: User[];
}
