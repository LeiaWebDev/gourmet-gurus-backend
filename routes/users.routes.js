const express = require("express");
const router = express.Router();
const uploader = require("./../config/cloudinary.config");
const User = require("../models/User.model");
const Workshop = require("../models/Workshop.model");
const Booking = require("../models/Booking.model");
const {
  isAuthenticated,
  isAdmin,
  isTeacher,
} = require("../middleware/jwt.middleware");

// all routes are prefixed with /api
// route to get all teachers

router.get("/teachers", async (req, res, next) => {
  console.log("View all teachers");
  try {
    // const allTeachers = await User.find({role:"Teacher"})
    const allTeachers = await User.find({ role: "Teacher" });
    res.json(allTeachers);
  } catch (error) {
    next(error);
  }
});

// route to get all users,
router.get("/", async (req, res, next) => {
  console.log("View all the users");
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

// update a teacher with specifid Id, ok
router.put("/teachers/:userId", isTeacher, async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, photo, bio, role } =
      req.body;
    const id = req.params.userId;
    const updatedTeacher = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // const updatedTeacher = await User.findByIdAndUpdate({_id: id, role: "Teacher"})
    res.json(updatedTeacher);

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// delete a teacher with specifid Id , ok
router.delete("/teachers/:userId", isAdmin, async (req, res, next) => {
  const id = req.params.userId;
  try {
    const deletedTeacher = await User.findByIdAndDelete({
      _id: id,
      role: "Teacher",
    });

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: `Teacher ${id} was deleted` });
  } catch (error) {
    next(error);
  }
});

// route to get one teacher, ok
router.get("/teachers/:userId", async (req, res, next) => {
  try {
    const oneTeacher = await User.findById({
      _id: req.params.userId,
      role: "Teacher",
    });
    console.log(oneTeacher);

    if (!oneTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(oneTeacher);
  } catch (error) {
    next(error);
  }
});

// route to get one user
router.get("/:userId", async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.userId);
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

// GET A USER PROFILE
router.get("/:userId/profile", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const userProfile = await User.findById(id);
    res.json(userProfile);
    // res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
});
// route for one user to update their profile
router.put(
  "/:userId/update-profile",
  //   isAuthenticated,
  uploader.single("photo"),
  async (req, res, next) => {
    try {
      const { firstName, lastName, phone, bio, role } = req.body;
      let photo;
      if (req.file) {
        photo = req.file.path;
      }
      const id = req.params.userId;
      const updatedProfile = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, phone, bio, role, photo },
        {
          new: true,
        }
      );
      res.json(updatedProfile);
      res.status(200).json(updatedProfile);
    } catch (error) {
      next(error);
    }
  }
);

// // PUT /api/workshops/:workshopId - Update a workshop by its ID
// // router.put("/:workshopId", isAuthenticated, isTeacher, async (req, res, next) => {
//     router.put("/:teacherId/:workshopId", async (req, res, next) => {
//         try {
//           const { workshopId, teacherId } = req.params;
//           const updatedData = req.body;

//           // const updatedWorkshop = await Workshop.findOne({
//           //   teacherId: teacherId,
//           //   _id: workshopId,
//           // });

//           // Use the workshopId to find and update the workshop
//           const updatedWorkshop = await Workshop.findByIdAndUpdate(
//             workshopId,
//             updatedData,
//             { new: true } // Return the updated workshop
//           );

//           if (!updatedWorkshop) {
//             return res.status(400).json({ message: "Workshop not found" });
//           }
//           res.json(updatedWorkshop);

//           res.status(200).json(updatedWorkshop);
//         } catch (error) {
//           next(error);
//         }
//       });

// delete a user with specifid Id
router.delete("/:userId", isAdmin, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: `User ${id} was deleted.` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
