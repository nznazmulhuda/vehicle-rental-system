import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const client = await pool.connect();

  try {
    await client.query(`BEGIN`);

    //! update vehicle status
    const isVehicleStatusUpdate = await client.query(
      `
    UPDATE vehicles 
    SET availability_status = 'booked' 
    WHERE 
    id = $1 AND availability_status = 'available'
    RETURNING vehicle_name, daily_rent_price
  `,
      [vehicle_id],
    );

    if (isVehicleStatusUpdate.rows.length === 0) {
      throw new Error("Vehicle is not available.");
    }

    const vehicle = isVehicleStatusUpdate.rows[0];

    const number_of_days =
      (new Date(rent_end_date as string).getTime() -
        new Date(rent_start_date as string).getTime()) /
      (1000 * 60 * 60 * 24);

    if (number_of_days <= 0) {
      throw new Error("Invalid rental duration");
    }

    const total_price = vehicle.daily_rent_price * number_of_days;

    const result = await client.query(
      `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING id`,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price],
    );

    await client.query(`COMMIT`);

    const data = {
      id: result.rows[0].id,
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status: result.rows[0].status,
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
      },
    };

    return data;
  } catch (err) {
    await client.query(`ROLLBACK`);
    throw err;
  } finally {
    client.release();
  }
};

const getBookings = async () => {
  return await pool.query(`
    SELECT
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,

      json_build_object (
        'name', u.name,
        'email', u.email
      ) AS customer,

      json_build_object (
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number
      ) AS vehicle

    FROM bookings b
    JOIN users u
    ON b.customer_id = u.id
    JOIN vehicles v
    ON b.vehicle_id = v.id
  `);
};

const getBooking = async (id: string) => {
  return await pool.query(
    `
    SELECT
      b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,

      json_build_object (
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number,
        'type', v.type
      ) AS vehicle

    FROM bookings b
    JOIN vehicles v
    ON b.vehicle_id = v.id

    WHERE b.customer_id = $1
  `,
    [id],
  );
};

const updateBookingStatus = async (
  role: "admin" | "customer",
  status: "returned" | "cancelled",
  bookingId: string,
) => {
  const allowedStatus = {
    admin: "returned",
    customer: "cancelled",
  } as const;

  if (allowedStatus[role] !== status) {
    throw new Error("You are not authorized");
  }

  const client = await pool.connect();

  try {
    await client.query(`BEGIN`);

    const booking = await client.query(
      `UPDATE bookings SET status=$1 WHERE id = $2 AND status = 'active' RETURNING *`,
      [allowedStatus[role], bookingId],
    );

    if (booking.rows.length === 0) {
      throw new Error("Booking not found.");
    }

    const vehicle = await client.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING availability_status`,
      [booking.rows[0].vehicle_id],
    );

    await client.query(`COMMIT`);

    const updatedBooking = booking.rows[0];

    const data =
      role === "admin"
        ? {
            ...updatedBooking,
            vehicle: {
              availability_status: vehicle.rows[0].availability_status,
            },
          }
        : { ...updatedBooking };

    return data;
  } catch (err) {
    await client.query(`ROLLBACK`);
    throw err;
  } finally {
    client.release();
  }
};

export const bookingServices = {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus
};
