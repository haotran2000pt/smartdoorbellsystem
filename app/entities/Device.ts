import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Notification } from "./Notification";
import { UserDevices } from "./UserDevices";

@Entity()
export class Device {
  @PrimaryKey()
  id!: string;

  @Property()
  createdDate: Date;

  @OneToMany(() => UserDevices, (o) => o.device)
  userDevices = new Collection<UserDevices>(this);

  @OneToMany(() => Notification, (o) => o.device)
  notifications = new Collection<Notification>(this);
}
