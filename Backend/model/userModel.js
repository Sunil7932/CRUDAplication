import mongoose from "mongoose";

// Define the employee schema
const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, 
      default: () => new mongoose.Types.ObjectId().toString(), // Generate unique id
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^\d{10}$/, 
      default: "0000000000",
    },
  },
  {
    timestamps: true,
  }
);

// Add index on 'name', 'email', 'id', and 'phone' fields
employeeSchema.index({ name: 1 });
employeeSchema.index({ email: 1 });
employeeSchema.index({ id: 1 });
employeeSchema.index({ phone: 1 });

// Create and export the model
const User = mongoose.model('User', employeeSchema);

export default User;
