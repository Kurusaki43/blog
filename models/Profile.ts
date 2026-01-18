import { Document, model, models, ObjectId, Schema } from "mongoose";

interface IProfile extends Document {
  userId: ObjectId;
  bio: string;
  avatarUrl: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    [key: string]: string | undefined;
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "",
      trim: true,
    },
    socialLinks: {
      twitter: { type: String, default: "", trim: true },
      facebook: { type: String, default: "", trim: true },
      linkedin: { type: String, default: "", trim: true },
      instagram: { type: String, default: "", trim: true },
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile =
  models.Profile || model<IProfile>("Profile", profileSchema);
