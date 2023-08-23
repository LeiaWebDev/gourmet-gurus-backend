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
    role: "Teacher",
  },
  {
    email: "helen@gg.com",
    password: hashedPassword,
    firstName: "Helen",
    lastName: "Korlugen",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "I am a vegetarian master chef.",
    role: "Teacher",
  },
  {
    email: "peppe@gg.com",
    password: hashedPassword,
    firstName: "Peppe",
    lastName: "Cutraro",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "I am a vegetarian master chef.",
    role: "Teacher",
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
    console.log("starting data seeding")
    await User.deleteMany();
    await Workshop.deleteMany();
    await Booking.deleteMany();

    console.log("cleared existing data")

    const createdUser = await User.create(users);
    const createdWorkshop = await Workshop.create(workshops);
    const createdBooking = await Booking.create(bookings);

    console.log("inserted new data")

    for (let workshop of createdWorkshop) {
      const foundUser = createdUser.find((user) => user.role === "Teacher");
      workshop.teacherId = foundUser._id;
      console.log(`assigned teacher Id ${foundUser._id} to workshop ${workshop.title}`)
    }
    console.log("completed data population")
  } catch (error) {
    console.error("error during data population", error);
  } finally {
    process.exit();
  }
}

seed();

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]._id;
}
