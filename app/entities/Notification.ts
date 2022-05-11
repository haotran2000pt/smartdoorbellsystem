import {
  Entity,
  Enum,
  ManyToOne,
  OptionalProps,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Device } from "./Device";
import { User } from "./User";

export enum NotificationType {
  SYSTEM,
  CAMERA,
}

@Entity()
export class Notification extends BaseEntity {
  [OptionalProps]?: "createdAt" | "updatedAt" | "read";

  @Enum()
  type: NotificationType;

  @Property()
  imageUrl?: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @ManyToOne()
  device?: Device;

  @ManyToOne()
  user?: User;

  @Property()
  read: boolean = false;
}
