const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const Workshop = require("../models/Workshop.model");

// All our routes are prefixed with /api

router.use("/auth", require("./auth.routes"));
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//seeding
router.get("/workshops", (req, res, next) => {
  Workshop.find()
    .populate('teacherId')
    .then((documents) => res.json(documents))
    .catch((e) => (next(e)))
});
router.use("/users", require("./users.routes"));
router.use("/workshops", require("./workshops.routes"));
router.use("/bookings", require("./bookings.routes"));

module.exports = router;
