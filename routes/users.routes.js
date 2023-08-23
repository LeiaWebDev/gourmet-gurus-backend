const express = require("express");
const router = express.Router();

const User = require("../models/User.model")
const Workshop = require("../models/Workshop.model")
const Booking = require("../models/Booking.model")


// all routes are prefixed with /api


// route to get all users, 
router.get("/", async(req, res, next)=>{
    console.log("View all the users")
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (error) {
        next(error)
    }
})

// route to get one user
router.get("/:userId", async(req, res, next)=>{
    
    try {
        const oneUser = await User.findById(req.params.userId)
        res.json(oneUser)
    } catch (error) {
        next(error)
    }
})

// route to get all teachers

router.get("/teachers", async(req, res, next)=>{
    console.log("View all teachers")
    try {
        // const allTeachers = await User.find({role:"Teacher"})
        const allTeachers = await User.find((user)=> user.role === "Teacher")
        res.json(allTeachers)
    } catch (error) {
        next(error)
    }
})


// route to get one teacher
router.get("/teachers/:userId", async(req, res, next)=>{
    
    try {
        const oneTeacher = await allTeachers.findById(req.params.userId)
        res.json(oneTeacher)
    } catch (error) {
        next(error)
    }
})



// delete a teacher with specifid Id
router.delete("/teachers/:userId", async(req, res, next)=>{
    const id = req.params.userId
    try {
        await allTeachers.findByIdAndDelete(id)
        res.sendStatus(204);
        // res.json({message: `teacher ${id} was deleted`})
    } catch (error) {
        next(error)
    }
})




module.exports = router;