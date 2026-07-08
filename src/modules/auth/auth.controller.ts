import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { authServices } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUp(req.body);

    if (result === null) {
      sendResponse(res, {
        status: 404,
        success: false,
        message: "User not found!",
      });
    } else {
      const {password, ...userWithoutPassword} = result.rows[0]
      sendResponse(res, {
        status: 201,
        success: true,
        message: "User registered successfully",
        data: userWithoutPassword,
      });
    }
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signIn(req.body);

    if (result === null) {
      sendResponse(res, {
        status: 404,
        success: false,
        message: "User not found!",
      });
    } else if (result === 0) {
      sendResponse(res, {
        status: 401,
        success: false,
        message: "Invalid password!",
      });
    } else {
      sendResponse(res, {
        status: 201,
        success: true,
        message: "Login successful",
        data: result,
      });
    }
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message as string,
    });
  }
};

export const authController = {
  signIn,
  signUp,
};
