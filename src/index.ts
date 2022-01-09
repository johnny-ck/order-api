import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { orderRouter } from "./routes";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(json());
app.use(orderRouter);

mongoose.connect("mongodb://mongo:27017/order", (res) => {
  if (res?.message) {
    throw new Error(res?.message);
  }
  console.log("connected to database");
});

// mongoose.connect("mongodb://localhost:27017/order", (res) => {
//   if (res?.message) {
//     throw new Error(res?.message);
//   }
//   console.log("connected to database");
// });

app.use((err: any, req: any, res: any, next: any) => {
  if (!err) {
    return next();
  }
  return res.status(400).send({ error: "error" });
});
app.use((req: any, res: any, next: any) => {
  return res.status(400).send({ error: "something went wrong" });
});
// todo use env
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
