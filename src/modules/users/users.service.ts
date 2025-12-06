import { pool } from '../../config/db';
import bcrypt from 'bcryptjs';

const getUser = async () => {
  return await pool.query(`SELECT id,name,email,phone,role FROM users`);
};

const updateUser = async (payload: Record<string, unknown>, id: string) => {
  //   console.log(Object.keys(payload).join(','));
  const { name, email, password, phone, role } = payload;
  const existingUser = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    id,
  ]);
  if (existingUser.rows.length === 0) return existingUser;

  const currentUser = existingUser.rows[0];
  // console.log(currentUser);
  // const hashedPass = await bcrypt.hash(password as string, 10);

  const updatedUser = {
    name: name ?? currentUser.name,
    email: email ?? currentUser.email,
    password: password
      ? await bcrypt.hash(password as string, 10)
      : currentUser.password,
    phone: phone ?? currentUser.phone,
    role: role ?? currentUser.role,
  };

  const result = await pool.query(
    `
    UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *
    `,
    [
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.phone,
      updatedUser.role,
      id,
    ]
  );
  delete result.rows[0].password;
  return result;
};

const deleteUser = async (id: string) => {
  const activeBookings = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
    [id]
  );
  if (activeBookings.rows.length) {
    return { blocked: true };
  }
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    `,
    [id]
  );
  return result;
};

export const userServices = {
  getUser,
  updateUser,
  deleteUser,
};
