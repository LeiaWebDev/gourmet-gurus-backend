require("dotenv").config();
require("../db/index");

const Workshop = require("../models/Workshop.model");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const bcrypt = require("bcrypt");
let password = "1234";
const hashedPassword = bcrypt.hashSync(password, 10);
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
});



const workshops = [
  {
    title: "Traditional Japanese Ramen",
    category: "Cooking",
    subCategory: "Japanese Cuisine",
    duration: "1h",
    maxParticipants: 5,
    description:
      "Discover the fresh ingredients and learn the step by step creation of an authentic delicious ramen",
    workshopPics: [
      "https://i.pinimg.com/564x/07/c4/10/07c410274cd8577757f772e729b98266.jpg",
      "https://i.pinimg.com/564x/80/22/01/80220156c5c0316d616766935f897a82.jpg",
      "https://i.pinimg.com/564x/ab/10/09/ab10098d578087b229f1d6148bb6ca9a.jpg",
      "https://i.pinimg.com/564x/6e/8b/55/6e8b5596fcd5a0e1300e2d8b7fae8ea2.jpg",
    ],
    location: "3 Rue Maillard",
    workshopMaterial: "Chopsticks & Spoons",
    price: 20,
    teacherId: "helen@gg.com",
    sessionsAvailable: new Date("2023-08-29"),
  },
  {
    title: "French Macarons",
    category: "Patisserie",
    subCategory: "French Cuisine",
    duration: "1h",
    maxParticipants: 5,
    description: "Engage in a fun macaron class.",
    workshopPics: [
      "https://i.pinimg.com/564x/07/c4/10/07c410274cd8577757f772e729b98266.jpg",
      "https://i.pinimg.com/564x/80/22/01/80220156c5c0316d616766935f897a82.jpg",
      "https://i.pinimg.com/564x/ab/10/09/ab10098d578087b229f1d6148bb6ca9a.jpg",
      "https://i.pinimg.com/564x/6e/8b/55/6e8b5596fcd5a0e1300e2d8b7fae8ea2.jpg",
    ],
    location: "8 Avenue Montaigne",
    workshopMaterial: "Spatula",
    price: 20,
    teacherId: "helen@gg.com",
    sessionsAvailable: new Date("2023-08-29"),
  },
  {
    title: "Pizza",
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
    location: "9 Rue Fourchette",
    workshopMaterial: "Fork",
    price: 20,
    teacherId: "peppe@gg.com",
    sessionsAvailable: new Date("2023-08-29"),
  },
  {
    title: "Gyoza from scratch",
    category: "Cooking",
    subCategory: "Japanese Cuisine",
    duration: "1h",
    maxParticipants: 5,
    description: "Authentic Delicious Gyoza Making",
    workshopPics: [
      "https://i.pinimg.com/564x/4b/0e/ff/4b0eff2a3833e41aa91275bf4bb101c0.jpg",
      "https://i.pinimg.com/564x/05/3d/8c/053d8c0232fc2940f8e9659411954a6d.jpg",
      "https://i.pinimg.com/564x/34/ae/3a/34ae3a837ecd94aa7e23d03909394096.jpg",
      "https://i.pinimg.com/564x/23/bb/42/23bb4277251016723e9914de2224953a.jpg",
    ],
    location: "9 Rue Fourchette",
    workshopMaterial: "Chopsticks",
    price: 20,
    teacherId: "coco@gg.com",
    sessionsAvailable: new Date("2023-08-29"),
  },
  {
    title: "Making some Colorful and delicious Mochi",
    category: "Patisserie",
    subCategory: "Japanese Cuisine",
    duration: "1h",
    maxParticipants: 10,
    description: "You will fall inlove with Mochis",
    workshopPics: [
      "https://i.pinimg.com/564x/5e/2d/62/5e2d62ff7b32544334800c1fb0859a5d.jpg",
      "https://i.pinimg.com/564x/fc/11/70/fc117060dab97b8d4fc3c0a01d4dfa25.jpg",
      "https://i.pinimg.com/564x/88/9f/6f/889f6f5fc0d10a3fb2d111c54c65a99f.jpg",
      "https://i.pinimg.com/564x/07/51/95/0751956a789cfe7639ff505ad9c1530a.jpg",
      "https://i.pinimg.com/564x/60/98/20/609820ca2eefeaa600c65a8508bc7cef.jpg",
    ],
    location: "12 Rue Lorem Ipsum",
    workshopMaterial: "Just yourself",
    price: 25,
    teacherId: "coco@gg.com",
    sessionsAvailable: new Date("2023-09-05"),
  },
  {
    title: "Fresh Italian Pasta from scratch",
    category: "Cooking",
    subCategory: "Italian Cuisine",
    duration: "2h",
    maxParticipants: 5,
    description: "Learn from the master of pasta",
    workshopPics: [
      "https://www.pinterest.fr/pin/711428072410771235/",
      "https://www.pinterest.fr/pin/251849804155211479/",
    ],
    location: "18 Rue Maillard",
    workshopMaterial: "Nothing",
    price: 20,
    teacherId: "carluccio@gg.com",
    sessionsAvailable: new Date("2023-09-21"),
  },
  {
    title: "Chocalate creation",
    category: "Patisserie",
    subCategory: "French Cuisine",
    duration: "2h",
    maxParticipants: 5,
    description: "Great for chocolate lovers!",
    workshopPics: [
      "https://i.pinimg.com/736x/1d/c0/77/1dc07707776cc01c368ae1531fb6ce7e.jpg",
      "https://i.pinimg.com/564x/59/b6/b7/59b6b72e9e56b244cc3b33ab9813e3fc.jpg",
      "https://i.pinimg.com/564x/23/57/fe/2357fe43a303633be3a870396560e143.jpg",
    ],
    location: "20 Rue Maillard",
    workshopMaterial: "Nothing",
    price: 10,
    teacherId: "cyril@gg.com",
    sessionsAvailable: new Date("2023-09-04T15:00:00"),
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
    bio: "Queen of croissants.",
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
  {
    email: "leia@gg.com",
    password: hashedPassword,
    firstName: "Leia",
    lastName: "T",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EPUNML9J-d0aa0e84a83b-192",
    bio: "Eager to learn a new baking skill",
    role: "User",
  },
  {
    email: "lily@gg.com",
    password: hashedPassword,
    firstName: "Lily",
    lastName: "Z",
    phone: "0909080809",
    photo: "https://ca.slack-edge.com/T05DVHKST3P-U05EB5K9ALR-445f3ed0c3f2-512",
    bio: "I want to make some ramen",
    role: "User",
  },
  {
    email: "coco@gg.com",
    password: hashedPassword,
    firstName: "Coco",
    lastName: "Le",
    phone: "090111229",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLFkGSSWoJidy4IwnlT1B8G2DAoi-H5TTqA&usqp=CAU",
    bio: "I grew up in Japan and learned from my Japanes grand mother how to make traditional Gyoza",
    role: "Teacher",
  },
  {
    email: "carluccio@gg.com",
    password: hashedPassword,
    firstName: "Carl",
    lastName: "Luccio",
    phone: "0901121229",
    photo:
      "https://www.nzherald.co.nz/resizer/rqWm7m6y-pE8c4tdMOb2EqfRrEU=/arc-anglerfish-syd-prod-nzme/public/J3H6QYCHXPBRS3NIDJFVG42CIA.jpg",
    bio: "Chef Carluccio was a masterful Italian chef based in London who spent more than 50 years in the business and is considered one of the forefathers of modern Italian cuisine.",
    role: "Teacher",
  },
  {
    email: "angel@gg.com",
    password: hashedPassword,
    firstName: "Angel",
    lastName: "T",
    phone: "06147773879",
    photo: "https://www.ed92.org/wp-content/uploads/2021/03/media.jpg",
    bio: "I love Japanese cuisine",
    role: "User",
  },
  {
    email: "nicholas@gg.com",
    password: hashedPassword,
    firstName: "Nicholas",
    lastName: "B",
    phone: "06147773879",
    photo:
      "https://i.pinimg.com/564x/b6/95/2e/b6952e9e12f141098a29ed4a20492957.jpg",
    bio: "The head pastry chef at the critically acclaimed Bouchon Bakery",
    role: "Teacher",
  },
  {
    email: "cyril@gg.com",
    password: hashedPassword,
    firstName: "Cyril",
    lastName: "L",
    phone: "9090902222",
    photo:
      "https://i.pinimg.com/564x/32/e9/60/32e960d3c07610e441f1539277e5d427.jpg",
    bio: "One of the best chefs in France",
    role: "Teacher",
  },
  {
    email: "nico@gg.com",
    password: hashedPassword,
    firstName: "Nico",
    lastName: "M",
    phone: "09928323008",
    photo: "https://www.refinery29.com/images/10231884.jpg?crop=40%3A21",
    bio: "I like to eat",
    role: "User",
  },
  {
    email: "dora@gg.com",
    password: hashedPassword,
    firstName: "Dora",
    lastName: "Theexplorer",
    phone: "90920930293",
    photo:
      "https://i.pinimg.com/564x/e5/e6/2f/e5e62f921ed456b9bd9b09fd8cfba222.jpg",
    bio: "I like to travel",
    role: "User",
  },
];

const bookings = [
  {
    session: new Date("2023-09-05T15:00:00"),
    status: "Confirmed",
    cancellation: "No refund after purchase",
    quantity: 1,
    workshopId: "20 Rue Maillard",
    userId: "lily@gg.com",
  },
  {
    session: new Date("2023-08-29T14:00:00"),
    status: "Confirmed",
    cancellation: "No refund after purchase",
    quantity: 1,
    workshopId: "9 Rue Fourchette",
    userId: "angel@gg.com",
  },
  {
    session: new Date("2023-09-04T15:00:00"),
    status: "Confirmed",
    cancellation: "No refund after purchase",
    quantity: 1,
    workshopId: "12 Rue Lorem Ipsum",
    userId: "leia@gg.com",
  },
  {
    session: new Date("2023-09-06T15:00:00"),
    status: "Confirmed",
    cancellation: "No refund after purchase",
    quantity: 1,
    workshopId: "20 Rue Maillard",
    userId: "nico@gg.com",
  },
  {
    session: new Date("2023-09-09T15:00:00"),
    status: "Confirmed",
    cancellation: "No refund after purchase",
    quantity: 1,
    workshopId: "20 Rue Maillard",
    userId: "dora@gg.com",
  },
];

bookings.forEach((booking) => {
  booking.formattedSession = dateFormatter.format(booking.session);
});

async function seed() {
  try {
    await User.deleteMany();
    await Workshop.deleteMany();
    await Booking.deleteMany();

    const createdUser = await User.create(users);

    for (let workshop of workshops) {
      const foundUser = await User.findOne({ email: workshop.teacherId });
      workshop.teacherId = foundUser._id;
      console.log(workshop.teacherId);
    }
    const createdWorkshop = await Workshop.create(workshops);

    for (let booking of bookings) {
      const foundWorkshop = await Workshop.findOne({
        location: booking.workshopId,
      });
      booking.workshopId = foundWorkshop._id;
      console.log(booking.workshopId);
    }
    for (let booking of bookings) {
      const foundUser = await User.findOne({
        email: booking.userId,
      });
      booking.userId = foundUser._id;
      console.log(booking.userId);
    }
    const createdBookings = await Booking.create(bookings);
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
