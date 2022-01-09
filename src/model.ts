import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  origin: [string];
  destination: [string];
  distance: string;
  status: "TAKEN" | "UNASSIGNED";
}

export const OrderSchema = new Schema({
  origin: [{ type: String, required: true }],
  destination: [{ type: String, required: true }],
  distance: { type: Number, required: true },
  status: { type: String, enum: ["TAKEN", "UNASSIGNED"], required: true },
});

const OrderModel = model<IOrder>("Order", OrderSchema);

export default OrderModel;
