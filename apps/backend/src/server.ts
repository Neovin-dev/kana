import "reflect-metadata";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
