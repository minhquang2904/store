import { Schema, models, model } from "mongoose";

const inventorySchema = new Schema({
  inventoryId: String,
  totalQuantity: Number,
});

const Inventory = models.Inventory || model("Inventory", inventorySchema);

export default Inventory;
