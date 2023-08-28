const express = require("express");
const Workshop = require("../models/Workshop.model");
const Booking = require("../models/Booking.model");
const router = express.Router();

const {
  isAuthenticated,
  isAdmin,
  isTeacher,
} = require("../middleware/jwt.middleware");

//Create a workshop
// router.post("/", isAuthenticated, isTeacher, async (req, res, next) => {
router.post(
  "/create-workshop",
  isAuthenticated,
  isTeacher,
  async (req, res, next) => {
    try {
      const createdWorkshop = await Workshop.create({
        ...req.body,
        teacherId: req.user._id,
      });
      res.status(201).json(createdWorkshop);
    } catch (error) {
      next(error);
    }
  }
);

// Get all workshop sessions

router.get("/:workshopId/sessions", async (req, res, next) => {
  try {
    const allWorkshopSessions = await Workshop.find(req.body.sessionsAvailable);
    res.json(allWorkshopSessions);
  } catch (error) {
    next(error);
  }
});

// Get all created workshops of a teacher
router.get("/teacher/:teacherId", async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const workshops = await Workshop.find({ teacherId });
    res.json(workshops);
  } catch (error) {
    next(error);
  }
});

//Create a session for a specific workshop
//isTeacher
router.post("/:workshopId/sessions/", isTeacher, async (req, res, next) => {
  try {
    const workshopId = req.params.workshopId;
    const newSession = req.body.sessionsAvailable;
    const foundWorkshop = await Workshop.findById(workshopId);
    if (!foundWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    foundWorkshop.sessionsAvailable.push(newSession);
    await foundWorkshop.save();
    res.status(201).json(foundWorkshop);
  } catch (error) {
    next(error);
  }
});

router.get("/:workshopId/sessions?:sessionIndex");

// Get all sessions per workshopId for this booking

// router.get("/:workshopId/sessions", async (req, res, next) => {
//   try {
//     const workshopId = req.params.workshopId;
//     const sessionsByWorkshopId = await Workshop.findById(workshopId).populate("sessionsAvailable");
//     res.json(allWorkshopSessions);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:workshopId/sessions", async (req, res, next) => {
  try {
    const { workshopId } = req.params;
    const workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    const sessions = workshop.sessionsAvailable;

    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
});

//  Delete a workshop session

router.delete(
  "/:workshopId/sessions/:sessionIndex",
  isTeacher,
  async (req, res, next) => {
    try {
      const { workshopId, sessionIndex } = req.params;
      const workshop = await Workshop.findById(workshopId);

      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }

      if (
        sessionIndex < 0 ||
        sessionIndex >= workshop.sessionsAvailable.length
      ) {
        return res.status(404).json({ message: "Invalid session index" });
      }
      //remove the session from the sessionsAvailable array
      workshop.sessionsAvailable.splice(sessionIndex, 1);

      // save the updated workshop (??)
      await workshop.save();
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

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
router.get("/:workshopId/participants", isTeacher, async (req, res, next) => {
  try {
    const workshopId = req.params.workshopId;
    const workshopParticipants = await Booking.find({ workshopId })
      .populate("userId", { firstName: 1, lastName: 1, _id: 0 })
      .sort({ lastName: 1 });

    if (workshopParticipants.length === 0) {
      return res.status(404).json({ message: "Participants not found" });
    }

    res.json(workshopParticipants);
  } catch (error) {
    next(error);
  }
});

// get teacher details for a specific workshop
//for one workshop page, get teacher details for a specific workshop
router.get("/:workshopId/:teacherId", async (req, res, next) => {
  try {
    const { teacherId, workshopId } = req.params;
    const teacherDetails = await Workshop.findById(workshopId).populate(
      "teacherId"
    );
    res.json(teacherDetails);
  } catch (error) {
    next(error);
  }
});

//UPDATE A WORKSHOP
// router.put("/:workshopId", isTeacher, async (req, res, next) => {
//   try {
//     const updatedWorkshop = await Workshop.findByIdAndUpdate(
//       req.params.workshopId,
//       req.body,
//       { new: true }
//       );
//       res.json(updatedWorkshop);
//     } catch (error) {
//       next(error);
//     }
//   });

// PUT /api/workshops/:workshopId - Update a workshop by its ID
// router.put("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
router.put("/:workshopId", async (req, res, next) => {
  try {
    const workshopId = req.params.workshopId;
    const updatedData = req.body;

    // Use the workshopId to find and update the workshop
    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      workshopId,
      updatedData,
      { new: true } // Return the updated workshop
    );

    if (!updatedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json(updatedWorkshop);
  } catch (error) {
    next(error);
  }
});

//DELETE A WORKSHOP
// router.delete("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
router.delete("/:workshopId", isTeacher, async (req, res, next) => {
  try {
    await Workshop.findByIdAndDelete(req.params.workshopId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
