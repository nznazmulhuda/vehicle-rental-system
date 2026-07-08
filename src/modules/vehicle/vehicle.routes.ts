import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router: Router = Router();

router.post("/", auth("admin"), vehicleControllers.createVechicle);
router.get("/", vehicleControllers.getVechicles);
router.get("/:vehicleId", vehicleControllers.getVechicle);
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVechicle);
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVechicle);

export const vehicleRouters = router;
