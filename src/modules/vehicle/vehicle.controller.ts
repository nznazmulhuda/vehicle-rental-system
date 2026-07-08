import { Request, Response } from "express";
import { vehicleServices } from "./vechicle.service";
import sendResponse from "../../helpers/sendResponse";

const createVechicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVechicle(req.body);

    sendResponse(res, {
      status: 201,
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

const getVechicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVechicles();

    if (result.rows.length === 0)
      sendResponse(res, {
        status: 200,
        success: true,
        message: "No vehicles found",
        data: [],
      });
    else
      sendResponse(res, {
        status: 200,
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

const getVechicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  try {
    const result = await vehicleServices.getVechicle(vehicleId as string);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

const updateVechicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  try {
    const result = await vehicleServices.updateVechicle(
      vehicleId as string,
      req.body,
    );

    if (!result)
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "Invalid input",
      });

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows,
    });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

const deleteVechicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  try {
    await vehicleServices.deleteVechicle(vehicleId as string);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

export const vehicleControllers = {
  createVechicle,
  getVechicles,
  getVechicle,
  updateVechicle,
  deleteVechicle,
};
