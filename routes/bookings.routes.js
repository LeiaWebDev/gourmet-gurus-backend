const express = require("express");
const router = express.Router();

const User = require("../models/User.model")
const Workshop = require("../models/Workshop.model")
const Booking = require("../models/Booking.model");
const { route } = require("./auth.routes");
const {isAuthenticated, isAdmin} = require("../middleware/jwt.middleware")


// all routes are prefixed with /api
// all routes are prefixed with /api/bookings too


router.post("/create",isAuthenticated, async(req, res, next)=>{
    try {
        const {session, status, cancellation, quantity, workshopId} = req.body
        const userId = req.user._id
        const createdBooking = await Booking.create({session, status, cancellation, quantity, workshopId, userId})
        res.status(201).json(createdBooking)
    } catch (error) {
        next(error)
    }
})

// route to get all bookings, 
router.get("/", async(req, res, next)=>{
    console.log("View all bookings")
    try {
        const allBookings = await Booking.find()
        res.json(allBookings)
    } catch (error) {
        next(error)
    }
})

// get the last booking done and pending by a userId
router.get('/last',isAuthenticated, async (req, res, next) => {
    try {
        const lastBooking = await Booking.findOne({userId: req.user._id}).populate('workshopId').sort({createdAt: -1})
        res.json(lastBooking)
    } catch (error) {
        next(error)
    }
})

// route to get one booking with workshop details
router.get("/:bookingId/bookingdetails", async(req, res, next)=>{
    
    try {
        const booking = await Booking.findById(req.params.bookingId)
        if(!booking){
            return res.status(404).json({message: "Booking not found"})
        }
        const oneBookingDetails = await Booking.findById(booking)
        .populate("workshopId userId", {createdAt:0, updatedAt:0})
        
        res.json(oneBookingDetails)

    } catch (error) {
        next(error)
    }
})


// route to update booking status confirmed specific booking by Id
router.put("/confirmed/:bookingId", isAuthenticated, async(req, res, next)=>{
    const {session, status, cancellation, quantity, workshopId, userId} = req.body
    const id = req.params.bookingId
    try {
        
        let updatedBooking = await Booking.findByIdAndUpdate(id, {status:"Confirmed"}, {new:true})
        res.json(updatedBooking)

    } catch (error) {
        next(error);
    }
})

// route to get one booking
router.get("/:bookingId", async(req, res, next)=>{
    
    try {
        const oneBooking = await Booking.findById(req.params.bookingId)
        res.json(oneBooking)
    } catch (error) {
        next(error)
    }
})

// route to update a specific booking by Id
router.put("/:bookingId", async(req, res, next)=>{
    const {session, status, cancellation, quantity, workshopId, userId} = req.body
    const id = req.params.bookingId
    try {
        
        let newBooking = await Booking.findByIdAndUpdate(id, req.body, {new:true})
        res.json(newBooking)

    } catch (error) {
        next(error);
    }
})

// route to delete a booking
router.delete("/:bookingId", async(req, res, next)=>{
    try {
        const id = req.params.bookingId
        await Booking.findByIdAndDelete(id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})



// route to delete one workshop in the booking??????
router.delete("/:bookingId/:workshopId", async(req, res, next)=>{
    try {
        const id = req.params.bookingId
        const workshopId = req.params.workshopId
        await Booking.findById(id).delete(workshopId)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})
module.exports = router;