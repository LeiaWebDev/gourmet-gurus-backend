const { Schema, model, SchemaType } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    firstName: {
      type: String,
      default: "your first name"
      // required: [true, "firstName is required."],
    },
    lastName: {
      type: String,
      default: "your last name"
      // required: [true, "lastName is required."],
    },
    phone: {
      type: Number,
      default: "your phone number"
      // required: [true, "phone is required."],
    },
    photo: {
      type: String,
      default: "photo URL"
      // required: [true, "photo is required."],
    },
    bio: {
      type: String,
      default: "none",
      
    },
    role: {
      type: String,
      enum: ["User", "Teacher"],
      default: "User",
    },
    // workshopId: {
    //   type: Number,
    //   ref: "Workshop"
    // },
    // bookingId: {
    //   type: Number,
    //   ref: "Booking"
    // },
    // favorites: {
    //   type: [String],
    //   ref: "Favorites"
    // },
    
    

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
