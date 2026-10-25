import mongoose, { Schema, type Model, Types } from "mongoose";

export type MembershipRole = "owner" | "admin" | "professional";

export interface IMembership {
  userId: Types.ObjectId;
  tenantId: Types.ObjectId;
  role: MembershipRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const membershipSchema = new Schema<IMembership>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    role: {
      type: String,
      enum: ["owner", "admin", "professional"],
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

membershipSchema.index({ userId: 1, tenantId: 1 }, { unique: true });

export const Membership: Model<IMembership> =
  (mongoose.models.Membership as Model<IMembership>) ||
  mongoose.model<IMembership>("Membership", membershipSchema);
