const addBooking = async (payload: Record<string, unknown>) => {
  console.log('todo:addBooking');
};

const getAllBookings = async () => {
  console.log('todo:getAllBookings');
};

const updateBooking = async (payload: Record<string, unknown>, id: string) => {
  console.log('todo:updateBooking');
};

export const bookingServices = { addBooking, getAllBookings, updateBooking };
