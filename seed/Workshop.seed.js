require("dotenv").config;

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
    title: "making spring rolls",
    category: "Cooking",
    subCategory: "Chinese Cuisine",
  },
];

const users = [
  { name: "Marc", password: hashedPassword },
  { name: "Jerome", password: hashedPassword },
  { name: "Mimi", password: hashedPassword },
];

async function seed() {
  try {
    await User.deleteMany();
    const allUsers = await User.create(users);
    await Workshop.deleteMany();
    for (let workshop of workshops) {
      const foundUser = await User.findOne({ name: workshop.teacher });
      workshop.teacher = foundUser._id;
    }
    await Workshop.create(workshops);
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
