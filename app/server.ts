import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { RequestHandler } from "express";
import http from "http";
import passport from "passport";
import "reflect-metadata";
import { Device, Notification, User, UserDevices } from "./entities";
import jwtStrategy from "./lib/passport/JwtStrategy";
import errorMiddleware from "./middleware/error";
import router from "./routes";
import path from "path";

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  deviceRepository: EntityRepository<Device>;
  notificationRepository: EntityRepository<Notification>;
  userDevicesRepository: EntityRepository<UserDevices>;
};

export const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.deviceRepository = DI.orm.em.getRepository(Device);
  DI.notificationRepository = DI.orm.em.getRepository(Notification);
  DI.userDevicesRepository = DI.orm.em.getRepository(UserDevices);

  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json());
  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  // app.get("/", (req, res) =>
  //   res.json({
  //     message:
  //       "Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!",
  //   })
  // );

  // app.use(express.static(path.join(__dirname, "../client/build")));

  app.use("/api/v1", router);
  app.use(errorMiddleware);

  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/build", "index.html"), (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // });

  DI.server = app.listen(port, () => {
    console.log(
      `MikroORM express TS example started at http://localhost:${port}`
    );
  });
})();
