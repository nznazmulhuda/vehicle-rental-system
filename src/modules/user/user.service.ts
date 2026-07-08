import { pool } from "../../config/db";

const getUsers = async () => {
  return await pool.query(`SELECT id, name, email, phone, role FROM users`);
};

const updateUser = async (id: string, payload: Record<string, unknown>) => {
  const keys = Object.keys(payload);

  if (keys.length === 0) {
    return null;
  }

  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");

  const values = [...Object.values(payload), id];

  const query = `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING id, name, email, phone, role`;

  return await pool.query(query, values);
};

const deleteUser = async (id: string) => {
  return await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
};

export const userServices = {
  getUsers,
  updateUser,
  deleteUser,
};
