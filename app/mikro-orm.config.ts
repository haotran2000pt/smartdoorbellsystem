import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import "dotenv/config";
import {
  BaseEntity,
  Device,
  Notification,
  User,
  UserDevices,
} from "./entities";

const options: Options = {
  type: "mysql",
  entities: [User, BaseEntity, Device, Notification, UserDevices],
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  metadataProvider: TsMorphMetadataProvider,
};

export default options;
