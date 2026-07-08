import { Response } from "express";

type SendResponseData = {
  status: number;
  success: boolean;
  message: string;
  errors?: string;
  data?: any;
};

const sendResponse = (res: Response, payload: SendResponseData) => {
  const { status, success, message, errors, data } = payload;

  if (!success) {
    return res.status(status).json({
      success,
      message,
      errors,
    });
  } else {
    return res.status(status).json({
      success,
      message,
      data,
    });
  }
};

export default sendResponse;
