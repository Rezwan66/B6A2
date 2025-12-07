import { pool } from './db';

const autoReturnBookings = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    // const booking = await pool.query(
    //   `SELECT * FROM bookings WHERE rent_end_date>$1`,
    //   [today]
    // );

    await pool.query(
      `
        UPDATE bookings SET status='returned' 
        WHERE rent_end_date<$1 AND status='active'
        `,
      [today]
    );

    await pool.query(
      `
      UPDATE vehicles SET availability_status='available' 
      WHERE id IN (
        SELECT vehicle_id FROM bookings
        WHERE rent_end_date<$1 AND status='returned'
      )
      `,
      [today]
    );

    console.log('✅ Booking auto-return check completed.');
  } catch (err: any) {
    console.error('❌ Booking auto-return failed:', err.message);
  }
};

export default autoReturnBookings;
