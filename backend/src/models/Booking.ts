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
}

const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  tour: { type: String, required: true },
  atvs: { type: Number, required: true },
  passengers: { type: Number },
  comment: { type: String },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
