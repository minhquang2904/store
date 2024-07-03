import { Schema, models, model } from "mongoose";

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPriceItem: {
    type: Number,
    required: true,
    default: 0,
  },
});

const historyOrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  email: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: "confirm",
  },
  createdAt: {
    type: Date,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: "",
  },
});

const HistoryOrder =
  models.HistoryOrder || model("HistoryOrder", historyOrderSchema);
export default HistoryOrder;
