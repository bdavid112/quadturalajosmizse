import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  tour: string;
  atvs: number;
  passengers?: number;
  comment: string;
  revenue: number;
}

const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  tour: { type: String, required: true },
  atvs: { type: Number, required: true },
  passengers: { type: Number, required: true },
  comment: { type: String },
  revenue: { type: Number, required: true },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
