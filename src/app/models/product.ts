import mongoose, { Schema, Document, model, models } from "mongoose";

interface IProduct extends Document {
  files: string[];
  name: string;
  subName: string;
  description: string;
  categories: string;
  sub_categories: string;
  sexs: string;
  price: number;
  discount: number;
  discountedPrice: number;
  colors: string[];
}

const productSchema: Schema = new Schema({
  files: {
    type: [String],
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  subName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  sub_categories: {
    type: String,
    required: true,
  },
  sexs: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  discountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  colors: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  size: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
