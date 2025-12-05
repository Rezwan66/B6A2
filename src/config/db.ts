import { Pool } from 'pg';
import config from '.';

const { connection_str: neonString } = config;

export const pool = new Pool({
  connectionString: `${neonString}`,
});

const createDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK(email=LOWER(email)),
        password TEXT NOT NULL CHECK(LENGTH(password)>=6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK(role IN ('admin','customer'))
        )
        `);
};

export default createDB;
