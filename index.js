import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConfig } from "./src/config/db.config.js";
import { connectDB } from "./src/db/index.js";
import redisConfig from "./src/config/redis.config.js";
import { connectRedis } from "./src/services/redis.service.js";
import loginRegister from "./src/routes/loginRegister.route.js";
import taskRouter from "./src/routes/task.route.js";
import { authentication, headerChecking } from "./src/middleware/authentication/authentication.middleware.js";
import setupSwagger from "./src/docs/index.js";

/**
 * @module module:start-server
 * @author PRAVIN DASARI
 * @description This is IIFE function to start server
 *
 * */

(async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  await connectDB(dbConfig);
  await connectRedis(redisConfig);
  app.use(headerChecking)
  app.use(loginRegister);
  app.use("/task", authentication, taskRouter);
  const port = process.env.PORT || 3000;
  app.listen(port, (info) => {
    console.log(`server started on ${port}`);
  });
  setupSwagger(app, port)
})();
