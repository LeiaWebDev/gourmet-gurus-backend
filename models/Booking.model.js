const { Schema, model, SchemaType } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookingSchema = new Schema(
  {
    session: {
      type: Date,
      required: [true, "Please choose a session."],
      unique: true,
    },
    status: {
      type: [String],
      required: [true, "status of the booking is required."],
    },
    cancellation: {
      type: [String],
      enum: ["Free cancellation 48 h before session date", "No refund after purchase"],
      required: [true, "cancellation policy is required."],
    },
    quantity: {
      type: Number,
      required: [true, "please choose a quantity of workshop."],
    },
    
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,

    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // workshopPrice: {
    //     type: Number,
    //     ref: "Workshop"
    //   },
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

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
