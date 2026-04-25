import { Schema, model, Document } from "mongoose";

interface Click {
  timestamp: Date;
  ip: string;
  userAgent: string;
}

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  analytics: Click[];
}

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    analytics: [
      {
        timestamp: { type: Date, default: Date.now },
        ip: String,
        userAgent: String,
      },
    ],
  },
  { timestamps: true },
);

export default model<IUrl>("Url", urlSchema);
