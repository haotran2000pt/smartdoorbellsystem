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

const options: Options = {
  type: "mysql",
  entities: [User, BaseEntity, Device, Notification, UserDevices],
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  dbName: "smartdoor-bell-system",
  highlighter: new SqlHighlighter(),
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
};

export default options;
