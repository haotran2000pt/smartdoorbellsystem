import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import {
  User,
  BaseEntity,
  Device,
  Notification,
  UserDevices,
} from "./entities";
import "dotenv/config";

const options: Options = {
  type: "mysql",
  entities: [User, BaseEntity, Device, Notification, UserDevices],
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  highlighter: new SqlHighlighter(),
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
};

export default options;
