import express, { Application, Request, Response } from "express";
import initDB from "./config/db";

const app: Application = express();

// database initial
initDB();

// default middlewares
app.use(express.json());

// rotues

// health
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "I'm alive..." });
});

// not-found routes
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "Route not exist!", path: req.path });
});

export default app;
