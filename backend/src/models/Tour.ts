import mongoose, { Schema, Document } from "mongoose";

export interface ITour extends Document {
  localizedTitle: string;
  name: {
    en: string;
    hu: string;
  };
  title: {
    en: string;
    hu: string;
  };
  descriptionShort: {
    en: string;
    hu: string;
  };
  descriptionLong: {
    en: string;
    hu: string;
  };
  attributes: {
    en: string[];
    hu: string[];
  };
  buttonPrimary: {
    en: string;
    hu: string;
  };
  buttonSecondary: {
    en: string;
    hu: string;
  };
  prices: {
    atvPrice: number;
    passengerPrice: number;
  };
}

const TourSchema: Schema = new Schema({
  localizedTitle: {
    type: String,
  },
  name: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
    required: true,
  },
  title: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
    required: true,
  },
  descriptionShort: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
    required: true,
  },
  descriptionLong: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
    required: true,
  },
  attributes: {
    type: new Schema({
      en: { type: [String], required: true },
      hu: { type: [String], required: true },
    }),
    required: true,
  },
  buttonPrimary: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
  },
  buttonSecondary: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
  },
  prices: {
    type: new Schema({
      atvPrice: { type: Number, required: true },
      passengerPrice: { type: Number, required: true },
    }),
    required: true,
  },
});

export default mongoose.model<ITour>("Tour", TourSchema);
