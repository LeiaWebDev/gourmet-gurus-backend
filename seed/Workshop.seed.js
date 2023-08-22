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
    duration: "1h",
    maxParticipants: 5,
    description: "Making japanese delicious ramen",
    workshopPics: [
      "https://i.pinimg.com/564x/07/c4/10/07c410274cd8577757f772e729b98266.jpg",
      "https://i.pinimg.com/564x/80/22/01/80220156c5c0316d616766935f897a82.jpg",
      "https://i.pinimg.com/564x/ab/10/09/ab10098d578087b229f1d6148bb6ca9a.jpg",
      "https://i.pinimg.com/564x/6e/8b/55/6e8b5596fcd5a0e1300e2d8b7fae8ea2.jpg",
    ],
    location: "3 Rue Maillard",
    workshopMaterial: "Spoon",
    price: 20,
    teacherId: "64e4fcff136ef569cc28244d",
    sessionsAvailable: new Date("2023-08-09"),
  },
  {
    title: "Macarons Making",
    category: "Patisserie",
    subCategory: "French Cuisine",
    duration: "1h",
    maxParticipants: 5,
    description: "Engage in a fun macaron class",
    workshopPics: [
      "https://i.pinimg.com/564x/07/c4/10/07c410274cd8577757f772e729b98266.jpg",
      "https://i.pinimg.com/564x/80/22/01/80220156c5c0316d616766935f897a82.jpg",
      "https://i.pinimg.com/564x/ab/10/09/ab10098d578087b229f1d6148bb6ca9a.jpg",
      "https://i.pinimg.com/564x/6e/8b/55/6e8b5596fcd5a0e1300e2d8b7fae8ea2.jpg",
    ],
    location: "3 Rue Maillard",
    workshopMaterial: "Knife",
    price: 20,
    teacherId: "64e4fcff136ef569cc28244e",
    sessionsAvailable: new Date("2023-08-09"),
  },
  {
    title: "Pizza making class",
    category: "Cooking",
    subCategory: "Italian Cuisine",
    duration: "1h",
    maxParticipants: 5,
    description: "Authentic Italian Pizza Making",
    workshopPics: [
      "https://i.pinimg.com/564x/07/c4/10/07c410274cd8577757f772e729b98266.jpg",
      "https://i.pinimg.com/564x/80/22/01/80220156c5c0316d616766935f897a82.jpg",
      "https://i.pinimg.com/564x/ab/10/09/ab10098d578087b229f1d6148bb6ca9a.jpg",
      "https://i.pinimg.com/564x/6e/8b/55/6e8b5596fcd5a0e1300e2d8b7fae8ea2.jpg",
    ],
    location: "3 Rue Maillard",
    workshopMaterial: "Fork",
    price: 20,
    teacherId: "64e4fcff136ef569cc28244f",
    sessionsAvailable: new Date("2023-08-09"),
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
    bio: "Croissant queen.",
    role: "Teacher",
  },
  {
    email: "peppe@gg.com",
    password: hashedPassword,
    firstName: "Peppe",
    lastName: "Cutraro",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "Pizza champion.",
    role: "Teacher",
  },
];

// const bookings = [
//   {
//     session: "2023-08-09",
//     status: "Confirmed",
//     cancellation: "No refund after purchase",
//     quantity: 1,
//     workshopId: createdWorkshops[0]._id,
//     userId: createdUsers[0]._id,
//   },
// ];

async function seed() {
  try {
    await User.deleteMany();
    await Workshop.deleteMany();
    await Booking.deleteMany();

    const createdUser = await User.create(users);
    const createdWorkshop = await Workshop.create(workshops);
    // const createdBooking = await Booking.create(bookings);

    for (let workshop of createdWorkshop) {
      const foundUser = createdUser.find((user) => user.role === "Teacher");
      workshop.teacherId = foundUser.id;
      console.log(workshop.teacherId);
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
