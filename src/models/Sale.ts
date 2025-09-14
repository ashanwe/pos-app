import mongoose, { Document, Schema } from "mongoose";

export interface ISale extends Document {
  orderId: string;
  cashierId: string;
  cashier: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  paymentMethod: "cash" | "card" | "online";
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const SaleSchema = new Schema<ISale>(
  {
    orderId: { type: String, required: true, unique: true },
    cashierId: { type: String, required: true },
    cashier: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "completed",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Sale ||
  mongoose.model<ISale>("Sale", SaleSchema);
