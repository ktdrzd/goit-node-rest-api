import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchemas = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  {
    versionKey: false,
  }
);

userSchemas.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(6);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model("User", userSchemas);
