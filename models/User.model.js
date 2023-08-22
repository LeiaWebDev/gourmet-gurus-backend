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
      required: [true, "firstName is required."],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required."],
    },
    phone: {
      type: Number,
      required: [true, "phone is required."],
    },
    photo: {
      type: String,
      required: [true, "photo is required."],
    },
    bio: {
      type: String,
      
    },
    role: {
      type: [String],
      enum: ["User", "Teacher"],
      required: [true, "Role is required."],
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
