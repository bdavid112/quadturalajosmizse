import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  date: Date;
  tourId: string;
  atvs: number;
  comment: string;
  revenue: number;
  paidAt: Date;
  isPaid: Boolean;
}

const BookingSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    tourId: { type: String, required: true },
    atvs: { type: Number, required: true },
    comment: { type: String },
    revenue: { type: Number, required: true },
    paidAt: { type: Date, default: null },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
