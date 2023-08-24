const express = require("express");
const Workshop = require("../models/Workshop.model");
const Booking = require("../models/Booking.model")
const router = express.Router();
const {isTeacher} = require("../middleware/jwt.middleware")
const {isAuthenticated} = require("../middleware/jwt.middleware")

//GET ALL WORKSHOPS

router.get("/", async (req, res, next) => {
  try {
    const allWorkShops = await Workshop.find();
    res.json(allWorkShops);
  } catch (error) {
    next(error);
  }
});

// Get one workshop
// router.get("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
router.get("/:workshopId", async (req, res, next) => {
  try {
    const oneWorkshop = await Workshop.findById(req.params.workshopId);
    res.json(oneWorkshop);
  } catch (error) {
    next(error);
  }
});


// teacher can get all participants for a specific workshop
// router.get("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
  router.get("/:workshopId/participants", async (req, res, next) => {
    try {

      const workshopParticipants = await Booking.findById(req.params.workshopId)
      .populate("userId", {firstName:1, lastName: 1, _id:0})
      .sort({lastName:1})

      if(!workshopParticipants){
        return res.status(404).json({message:"Participants not found"})
        }

      res.json(workshopParticipants);

    } catch (error) {
      next(error);
    }
  });


//Create a workshop
// router.post("/", isAuthenticated, isTeacher, async (req, res, next) => {
router.post("/", async (req, res, next) => {
  try {
    const createdWorkshop = await Workshop.create(req.body);
    res.status(201).json(createdWorkshop);
  } catch (error) {
    next(error);
  }
});

//UPDATE A WORKSHOP
// router.put("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
router.put("/:workshopId", async (req, res, next) => {
  try {
    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      req.params.workshopId,
      req.body,
      { new: true }
    );
    res.json(updatedWorkshop);
  } catch (error) {
    next(error);
  }
});

//DELETE A WORKSHOP
// router.delete("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
router.delete("/:workshopId", async (req, res, next) => {
  try {
    await Workshop.findByIdAndDelete(req.params.workshopId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
