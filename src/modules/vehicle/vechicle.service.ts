import { pool } from "../../config/db";

const createVechicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  return await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );
};

const getVechicles = async () => {
  return await pool.query(`SELECT * FROM vehicles`);
};

const getVechicle = async (id: string) => {
  return await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
};

const updateVechicle = async (id: string, payload: Record<string, unknown>) => {
  const keys = Object.keys(payload);

  if (keys.length === 0) {
    return null;
  }

  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");

  const values = [...Object.values(payload), id];

  const query = `UPDATE vehicles SET ${setClause} WHERE id = $${values.length} RETURNING *`;

  return await pool.query(query, values);
};

const deleteVechicle = async (id: string) => {
  return await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
};

export const vehicleServices = {
  createVechicle,
  getVechicles,
  getVechicle,
  updateVechicle,
  deleteVechicle,
};
