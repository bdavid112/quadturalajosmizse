import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  comment: string;
  rating: "5" | "4" | "3" | "2" | "1";
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: {
      type: String,
      enum: ["5", "4", "3", "2", "1"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", ReviewSchema);
