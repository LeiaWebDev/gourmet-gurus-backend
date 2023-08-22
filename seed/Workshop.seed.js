require("dotenv").config();

require("../db/index");

const Workshop = require("../models/Workshop.model");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const bcrypt = require("bcrypt");
let password = "1234";
const hashedPassword = bcrypt.hashSync(password, 10);
const workshops = [
  {
    title: "making ramen soup",
    category: "Cooking",
    subCategory: "Japanese Cuisine",
  },
  {
    title: "Macarons Making",
    category: "Patisserie",
    subCategory: "French Cuisine",
  },
  {
    title: "Pizza",
    category: "Cooking",
    subCategory: "Italian Cuisine",
  },
];

const users = [
  {
    email: "florian@gg.com",
    password: hashedPassword,
    firstName: "Florian",
    lastName: "Aube",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "I am a vegetarian master chef.",
    role: "teacher",
  },
  {
    email: "helen@gg.com",
    password: hashedPassword,
    firstName: "Helen",
    lastName: "Korlugen",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "I am a vegetarian master chef.",
    role: "teacher",
  },
  {
    email: "peppe@gg.com",
    password: hashedPassword,
    firstName: "Peppe",
    lastName: "Cutraro",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "I am a vegetarian master chef.",
    role: "teacher",
  },
];

const bookings = [
  {
    session: 8 / 9 / 23,
    status: "Confirmed",
    cancellation: "No refund after purchase",
    quantity: 1,
    workshopId: 80000,
    userId: "616c4b4c649eaa001dd50f82",
  },
];

async function seed() {
  try {
    await User.deleteMany();
    await Workshop.deleteMany();
    await Booking.deleteMany();

    const createdUser = await User.create(users);
    const createdWorkshop = await Workshop.create(workshops);
    const createdBooking = await Booking.create(bookings);

    for (let workshop of workshops) {
      const foundUser = await User.findOne({ name: workshop.teacher });
      workshop.teacher = foundUser._id;
    }
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}

seed();

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]._id;
}
