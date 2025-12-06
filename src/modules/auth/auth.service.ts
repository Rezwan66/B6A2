import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';
import jwt from 'jsonwebtoken';
import config from '../../config';

const registerUser = async (payload: Record<string, unknown>) => {
  //   console.log(Object.keys(payload).join(','));
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [name, (email as string).toLowerCase(), hashedPass, phone, role]
  );

  delete result.rows[0].password;

  return result;
};

const loginUser = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) return null;
  const user = result.rows[0];
  const matchedPass = await bcrypt.compare(password as string, user.password);
  if (!matchedPass) return false;

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    { expiresIn: '15d' }
  );
  // console.log({ token });
  delete user.password;

  return { token, user };
};

export const authServices = { registerUser, loginUser };
