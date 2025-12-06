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
  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK(type IN ('car','bike','van','SUV')),
        registration_number VARCHAR(20) UNIQUE NOT NULL,
        daily_rent_price DECIMAL NOT NULL CHECK(daily_rent_price>0),
        availability_status VARCHAR(20) NOT NULL CHECK(availability_status IN ('available', 'booked'))
        )
    `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK(rent_end_date>rent_start_date),
        total_price DECIMAL NOT NULL CHECK(total_price>0),
        status VARCHAR(20) NOT NULL CHECK(status IN ('active', 'cancelled', 'returned')) 
        )
    `);
};

export default createDB;
