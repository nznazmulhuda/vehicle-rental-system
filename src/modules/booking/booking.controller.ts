import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import sendResponse from "../../helpers/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const data = await bookingServices.createBooking(req.body);

    sendResponse(res, {
      status: 201,
      success: true,
      message: "Booking created successfully",
      data,
    });
  } catch (err: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  const currentUser = req.user as JwtPayload;


  try {
    if (currentUser.role === "admin") {
      const results = await bookingServices.getBookings();

      sendResponse(res, {
        status: 200,
        success: true,
        message: "Bookings retrieved successfully",
        data: results.rows,
      });
    } else {
      const result = await bookingServices.getBooking(currentUser.id);

      sendResponse(res, {
        status: 200,
        success: true,
        message: "Your bookings retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err) {}
};

export const bookingController = {
  createBooking,
  getBookings,
};
