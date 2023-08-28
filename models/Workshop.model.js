const { Schema, model, SchemaType } = require("mongoose");

const workshopSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    category: {
      type: [String],
      enum: ["Cooking", "Bakery", "Patisserie"],
      required: [true, "Category is required"],
    },
    subCategory: {
      type: [String],
      enum: [
        "Japanese Cuisine",
        "French Cuisine",
        "South American Cuisine",
        "Chinese Cuisine",
        "Italian Cuisine",
      ],
      required: [true, "Sub-category is required"],
    },
    duration: {
      type: String,
      enum: ["1h", "2h", "3h"],
      required: [true, "duration is required"],
    },
    
    maxParticipants: {
      type: Number,
      min: 2,
      max: 10,
      required: [true, "maximum participants is required"],
    },
    description: {
      type: String,
      required: [true, "description of the workshop is required"],
    },
    workshopPics: {
      type: [String],
      // required: [true, "at least one picture of the workshop is required"],
    },
    location: {
      type: String,
      required: [true, "location/address of the workshop is required"],
    },
 
    workshopMaterial: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "price of the workshop is required"],
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "teacher for this workshop is required."],
    },
    
    sessionsAvailable: {
      type: [Date],
      required: [true, "at least one session for this workshop is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Workshop = model("Workshop", workshopSchema);
module.exports = Workshop;