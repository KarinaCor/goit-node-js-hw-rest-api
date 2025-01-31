const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
    avatarURL: {
      type: String,
      required: true,
       default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
