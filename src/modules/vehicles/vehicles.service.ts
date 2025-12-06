import { pool } from '../../config/db';

const addVehicles = async (payload: Record<string, unknown>) => {
  //   console.log(Object.keys(payload).join(','));
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getAllVehicles = async () => {
  return await pool.query(`SELECT * FROM vehicles`);
};

const getSingleVehicle = async (id: string) => {
  return await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
};

const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  // console.log(Object.keys(payload).join(','));
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const existingVehicle = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1`,
    [id]
  );
  if (existingVehicle.rows.length === 0) return existingVehicle;

  const currentVehicle = existingVehicle.rows[0];

  const updatedVehicle = {
    vehicle_name: vehicle_name ?? currentVehicle.vehicle_name,
    type: type ?? currentVehicle.type,
    registration_number:
      registration_number ?? currentVehicle.registration_number,
    daily_rent_price: daily_rent_price ?? currentVehicle.daily_rent_price,
    availability_status:
      availability_status ?? currentVehicle.availability_status,
  };

  const result = await pool.query(
    `
    UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *
    `,
    [
      updatedVehicle.vehicle_name,
      updatedVehicle.type,
      updatedVehicle.registration_number,
      updatedVehicle.daily_rent_price,
      updatedVehicle.availability_status,
      id,
    ]
  );

  return result;
};

const deleteVehicle = async (id: string) => {
  const activeBookings = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'`,
    [id]
  );
  if (activeBookings.rows.length) {
    return { blocked: true };
  }
  const result = await pool.query(
    `
    DELETE FROM vehicles WHERE id=$1
    `,
    [id]
  );
  return result;
};

export const vehicleServices = {
  addVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
