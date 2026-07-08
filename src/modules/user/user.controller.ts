import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { userServices } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();

    if (result.rows.length === 0)
      sendResponse(res, {
        status: 200,
        success: true,
        message: "No users found",
        data: [],
      });
    else
      sendResponse(res, {
        status: 200,
        success: true,
        message: "Users retrieved successfully",
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

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await userServices.updateUser(
      userId as string,
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
      message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await userServices.deleteUser(userId as string);

    sendResponse(res, {
      status: 200,
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

export const userControllers = {
  getUsers,
  updateUser,
  deleteUser,
};
