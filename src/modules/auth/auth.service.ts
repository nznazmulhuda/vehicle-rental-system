import config from "../../config";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(
    password as string,
    Number(config.salt_round),
  );

  return await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashPassword, phone, role],
  );
};

const signIn = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  //? find the user
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  //? check the user is found or not
  if (result.rows.length === 0) return null;

  const user = result.rows[0];

  //? check the password is valid or not
  const isPasswordMatched = await bcrypt.compare(
    password as string,
    user.password,
  );

  //? if the password is not valid
  if (!isPasswordMatched) return 0;

  //? generate jwt token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret as string,
    {
      expiresIn: config.jwt_expiresin as any,
    },
  );

  //? return the user
  delete user.password;
  return { token, user };
};

export const authServices = {
  signIn,
  signUp,
};
