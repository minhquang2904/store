import { Schema, Document, model, models } from "mongoose";

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
  soldCount: number;
  quantity: number;
  sizes: string[];
}

const productSchema: Schema = new Schema({
  files: {
    type: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true },
      },
    ],
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
  colors: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  sizes: [
    {
      color: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  soldCount: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
