import mongoose, { Schema, Document } from "mongoose";

export interface ITour extends Document {
  name: {
    en: string;
    hu: string;
  };
  description: {
    short: {
      en: string;
      hu: string;
    };
    long: {
      en: string;
      hu: string;
    };
  };
  attributes: {
    en: string[];
    hu: string[];
  };
  buttons: {
    en: {
      primary: string;
      secondary: string;
    };
    hu: {
      primary: string;
      secondary: string;
    };
  };
  prices: {
    atvPrice: number;
    passengerPrice: number;
  };
}

const TourSchema: Schema = new Schema({
  name: {
    type: new Schema({
      en: { type: String, required: true },
      hu: { type: String, required: true },
    }),
    required: true,
  },
  description: {
    type: new Schema({
      en: {
        type: new Schema({
          short: { type: String, required: true },
          long: { type: String, required: true },
        }),
        required: true,
      },
      hu: {
        type: new Schema({
          short: { type: String, required: true },
          long: { type: String, required: true },
        }),
        required: true,
      },
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
  buttons: {
    type: new Schema({
      en: {
        type: new Schema({
          primary: { type: String, required: true },
          secondary: { type: String, required: true },
        }),
        required: true,
      },
      hu: {
        type: new Schema({
          primary: { type: String, required: true },
          secondary: { type: String, required: true },
        }),
        required: true,
      },
    }),
    required: true,
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
