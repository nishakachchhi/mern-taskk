import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        get: (image) => {
          return `${process.env.APP_URL}/${image}`;
        }, // Assuming you store the image file names
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Product = mongoose.model("Product", productSchema);
