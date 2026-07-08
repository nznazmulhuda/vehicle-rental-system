import express, { Application, Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRouters } from "./modules/vehicle/vehicle.routes";
import { userRoutes } from "./modules/user/user.routes";

const app: Application = express();

// database initial
initDB();

// default middlewares
app.use(express.json());

// rotues
app.use("/api/v1/auth", authRoutes); //? auth routes
app.use("/api/v1/vehicles", vehicleRouters) //? vehicle routes
app.use("/api/v1/users", userRoutes) //? user routes

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
