import { pool } from '../../config/db';
import Status from '../../constants/bookingStatus';
import Roles from '../../constants/roles';
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

const getAllBookings = async (payload: Record<string, unknown>) => {
  // return await pool.query(`SELECT * FROM bookings`);
  console.log(payload);
  const { id, name, email, role } = payload;
  if (role === Roles.admin) {
    const allBookings = await pool.query(`
      SELECT * FROM bookings
      JOIN vehicles ON bookings.vehicle_id=vehicles.id
      JOIN users ON bookings.customer_id=users.id
      `);
    // console.log(allBookings.rows);
    const result = allBookings.rows.map(b => ({
      id: b.id,
      customer_id: b.customer_id,
      vehicle_id: b.vehicle_id,
      rent_start_date: b.rent_start_date,
      rent_end_date: b.rent_end_date,
      total_price: Number(b.total_price),
      status: b.status,
      customer: {
        name: b.name,
        email: b.email,
      },
      vehicle: {
        vehicle_name: b.vehicle_name,
        registration_number: b.registration_number,
      },
    }));
    return result;
  } else if (role === Roles.customer) {
    const myBookings = await pool.query(
      `SELECT * FROM bookings 
      JOIN vehicles ON bookings.vehicle_id=vehicles.id
      WHERE customer_id=$1`,
      [id]
    );
    const bookingsArr = myBookings.rows;
    // console.log(bookingsArr);
    const result = bookingsArr.map(b => ({
      id: b.id,
      vehicle_id: b.vehicle_id,
      rent_start_date: b.rent_start_date,
      rent_end_date: b.rent_end_date,
      total_price: Number(b.total_price),
      status: b.status,
      vehicle: {
        vehicle_name: b.vehicle_name,
        registration_number: b.registration_number,
        type: b.type,
      },
    }));
    // console.log(result);

    return result;
  }
};

const updateBooking = async (payload: Record<string, unknown>, id: string) => {
  console.log('todo:updateBooking');
};

export const bookingServices = { addBooking, getAllBookings, updateBooking };
