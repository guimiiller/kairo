import mongoose, { Schema, type Model } from "mongoose";

export interface ITenant {
  name: string;
  slug: string;
  businessType: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const tenantSchema = new Schema<ITenant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    businessType: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Tenant: Model<ITenant> =
  (mongoose.models.Tenant as Model<ITenant>) ||
  mongoose.model<ITenant>("Tenant", tenantSchema);
