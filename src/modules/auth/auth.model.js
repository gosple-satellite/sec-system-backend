// src/modules/auth/auth.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: [
        "SUPER_ADMIN",
        "RESIDENT",
        "GATE_OFFICER",
        "ESTATE_OFFICER",
        "COMMAND_CENTER",
      ],
      default: "RESIDENT",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },

    refreshToken: String,

    passwordResetToken: String,

    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);