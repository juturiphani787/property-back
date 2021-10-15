import * as mongoose from 'mongoose';
export interface IBookings extends mongoose.Document {
  userId: String;
  bookingId: string;
  propertyId: String;
  roomId: String;
  adult	: String;
  child: String;
  extras: String;
  amount: String;
  payment: String;
  status: Number;
  startDate:String;
  endDate:String;
  startTime:String;
  endTime:String;
  //Actions
};

const BookingsSchema = new mongoose.Schema({
  startDate:String,
  endDate:String,
  startTime:String,
  endTime:String,
  propertyId:String,
  roomId: String,
  userId: {
    type:String,
    required:true
  },
  bookingId: {
    type:String,
    required:true
  },
  createdOn: {
    type: Date,
    default: new Date()
  },
  updatedOn: {
    type: Date,
    default: new Date()
  },
  adult: {
    type: String
  },
  child: {
    type: String
  },
  extras: {
    type: String
  },
  amount: {
    type: String
  },
  payment: {
    type: String
  },
  status: {
    type: String
  },
  
});

export const Bookings = mongoose.model<IBookings>('Bookings', BookingsSchema);
