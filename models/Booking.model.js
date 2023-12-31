const { Schema, model, SchemaType } = require("mongoose");


const bookingSchema = new Schema(
  {
    session: {
      type: Date,
      required: [true, "Please choose a session."],
      
    },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled"],
      required: [true, "status of the booking is required."],
    },
    cancellation: {
      type: String,
      enum: [
        "Free cancellation 48h before session date",
        "No refund after purchase",
      ],
      default: "Free cancellation 48h before session date",
      
    },
    quantity: {
      type: Number,
      default: 1,
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
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
