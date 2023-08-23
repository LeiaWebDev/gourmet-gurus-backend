const express = require("express");
const Workshop = require("../models/Workshop.model");
const router = express.Router();

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

router.get("/:workshopId", isTeacher, async (req, res, next) => {
  try {
    const oneWorkshop = await Workshop.findById(req.params.workshopId);
    res.json(oneWorkshop);
  } catch (error) {
    next(error);
  }
});
//Create a workshop

router.post("/", isTeacher, async (req, res, next) => {
  try {
    const createdWorkshop = await Workshop.create(req.body);
    res.status(201).json(createdWorkshop);
  } catch (error) {
    next(error);
  }
});

//UPDATE A WORKSHOP
router.put("/:workshopId", isTeacher, async (req, res, next) => {
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

router.delete("/:workshopId", isTeacher, async (req, res, next) => {
  try {
    await Workshop.findByIdAndDelete(req.params.workshopId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
