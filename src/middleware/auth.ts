import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import sendResponse from "../helpers/sendResponse";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] as string;

    //? 1. check the token is available or not
    if (!token) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "You are not authorized.",
      });
    }

    //? 2. verify the token using jwt
    const data = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

    //? 3. if no data is found
    if (!data) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Invalid authentication token",
      });
    }

    //? 4. check the request user role and protected route role same or not
    if(roles.length && !roles.includes(data.role)) {
      return sendResponse(res, {
        status: 403,
        success: false,
        message: "Valid token but insufficient permissions",
      });
    }

    req.user = data

    //? 5. pass the request for next segments
    next();
  };
};

export default auth;
