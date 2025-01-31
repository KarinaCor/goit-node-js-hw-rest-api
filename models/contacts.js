const { Schema, model } = require("mongoose");

const { MongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\)\s\d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", MongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
