const express = require("express");
const router = express.Router();

const User = require("../models/User.model")
const Workshop = require("../models/Workshop.model")
const Booking = require("../models/Booking.model")
const {isAuthenticated, isAdmin, isTeacher} = require("../middleware/jwt.middleware")


// all routes are prefixed with /api
// route to get all teachers

router.get("/teachers", async(req, res, next)=>{
    console.log("View all teachers")
    try {
        // const allTeachers = await User.find({role:"Teacher"})
        const allTeachers = await User.find({role: "Teacher"})
        res.json(allTeachers)
    } catch (error) {
        next(error)
    }
})


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


// route to create a new user
router.post('/new-user/', async(req, res, next)=>{
    try {
        const {firstName, lastName, email, password, phone, photo, bio, role} = req.body
        const createdUser = await User.create(req.body)
        res.status(201).json(createdUser)

	} catch (error) {
		next(error);
	}
})

// route to create a new teacher
router.post('/new-teacher/', async(req, res, next)=>{
    try {
        // const {
        //     firstName,
        //     lastName, 
        //     email, 
        //     password, 
        //     phone, 
        //     photo, 
        //     bio, 
        //     role} = req.body

        const createdTeacher = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone, 
            photo: req.body.photo, 
            bio: req.body.bio, 
            role: "Teacher",
        }

        )
        res.status(201).json(createdTeacher)

	} catch (error) {
		next(error);
	}
})



// update a teacher with specifid Id, ok
router.put("/teachers/:userId", isTeacher, async(req, res, next)=>{
    
    try {
        const {firstName, lastName, email, password, phone, photo, bio, role} = req.body 
        const id = req.params.userId
        const updatedTeacher = await User.findByIdAndUpdate(id, req.body, {new: true})
        // const updatedTeacher = await User.findByIdAndUpdate({_id: id, role: "Teacher"})
        res.json(updatedTeacher)

        if (!updatedTeacher){
            return res.status(404).json({message: "Teacher not found"})
        }
        
        res.sendStatus(204);
        
    } catch (error) {
        next(error)
    }
})

// delete a teacher with specifid Id , ok
router.delete("/teachers/:userId", isAdmin, async(req, res, next)=>{
    const id = req.params.userId
    try {
        const deletedTeacher = await User.findByIdAndDelete({_id: id, role: "Teacher"})
        
        if (!deletedTeacher){
            return res.status(404).json({message: "Teacher not found"})
        }
        res.json({message: `Teacher ${id} was deleted`});
        
    } catch (error) {
        next(error)
    }
})



// route to get one teacher, ok
router.get("/teachers/:userId", async(req, res, next)=>{
    
    try {
        const oneTeacher = await User.findById({_id: req.params.userId, role: "Teacher" })
        console.log(oneTeacher)

        if(!oneTeacher){
            return res.status(404).json({message:"Teacher not found"})
        }
        res.json(oneTeacher)
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


// route for one user to update their profile
router.put("/:userId", isAuthenticated, async(req, res, next)=>{
    try {
        const {firstName, lastName, email, password, phone, photo, bio, role} = req.body 
        const id = req.params.userId
        const createdUserDetails = await User.findByIdAndUpdate(id, req.body, {new: true})
        res.json(createdUserDetails)
    } catch (error) {
        next(error)
    }
})


// delete a user with specifid Id
router.delete("/:userId", isAdmin, async(req, res, next)=>{
    
    try {

        const id = req.params.userId
        const deletedUser = await User.findByIdAndDelete(id)
        
        if (!deletedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.json({message: `User ${id} was deleted.`});
    } catch (error) {
        next(error)
    }
})  




module.exports = router;