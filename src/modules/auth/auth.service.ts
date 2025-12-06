import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';

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

export const authServices = { registerUser };
