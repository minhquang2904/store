import { Schema, models, model } from "mongoose";

const numberOrderSchema = new Schema({
  numberOrderId: String,
  totalOrder: {
    type: Number,
    default: 0,
  },
});

const TotalOrder =
  models.Total_order || model("Total_order", numberOrderSchema);

export default TotalOrder;
