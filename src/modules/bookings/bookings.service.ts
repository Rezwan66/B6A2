import { pool } from '../../config/db';
import Status from '../../constants/bookingStatus';
import Availability from '../../constants/vehicleAvailability';
import subtractDates from '../../utils/getDays';

const addBooking = async (payload: Record<string, unknown>) => {
  // console.log(Object.keys(payload).join(','));
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleToBook = await pool.query(`SELECT * FROM vehicles where id=$1`, [
    vehicle_id,
  ]);
  // console.log(vehicleToBook.rows[0]);
  if (vehicleToBook.rows[0].availability_status !== Availability.available) {
    return false;
  }

  const bookingDuration = subtractDates(
    rent_start_date as string,
    rent_end_date as string
  );
  const totalPrice = bookingDuration * vehicleToBook.rows[0].daily_rent_price;

  const createBooking = await pool.query(
    `
    INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      Status.active,
    ]
  );
  // console.log(createBooking.rows[0]);
  const updateVehicle = await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
    [Availability.booked, vehicle_id]
  );
  const result = {
    ...createBooking.rows[0],
    vehicle: {
      vehicle_name: updateVehicle.rows[0].vehicle_name,
      daily_rent_price: updateVehicle.rows[0].daily_rent_price,
    },
  };
  return result;
};

const getAllBookings = async () => {
  console.log('todo:getAllBookings');
};

const updateBooking = async (payload: Record<string, unknown>, id: string) => {
  console.log('todo:updateBooking');
};

export const bookingServices = { addBooking, getAllBookings, updateBooking };
