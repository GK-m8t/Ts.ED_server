import { model, Schema, Document, Model } from "mongoose";
import { Cost, Shipping, Payment, Status, Account } from "../src/types"; // Import the relevant schema definitions.

// Define the interface for the Order document.
interface OrderDocument extends Document {
  tokenId: string;
  account: Account; // Make sure to import or define the Account type.
  cost: Cost;
  shipping: Shipping;
  payment: Payment | null;
  status: Status | null;
}

// Create a Mongoose schema based on the OrderDocument interface.
const orderSchema = new Schema<OrderDocument>({
  tokenId: { type: String, required: true },
  account: { type: Object, required: true }, // Make sure to define the Account type.
  cost: { type: Object, required: true },
  shipping: { type: Object, required: true },
  payment: { type: Object, default: null },
  status: { type: Object, default: null }
});

// Create and export the Mongoose model.
export const orderBook: Model<OrderDocument> = model<OrderDocument>(
  "Order",
  orderSchema
);
