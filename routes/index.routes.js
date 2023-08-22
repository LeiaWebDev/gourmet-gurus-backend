

const express = require("express");
const router = express.Router();
const User = require("./../models/User.model")
const Workshop = require("../models/Workshop.model")

// All our routes are prefixed with /api

router.use("auth", require("./auth.routes"))
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/workshops", (req, res, next) => {
  Workshop.find()
  .populate(teacherId)
  .then((documents) => res.json(documents))
  
});

module.exports = router;