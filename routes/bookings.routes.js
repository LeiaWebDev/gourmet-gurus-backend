const express = require("express");
const router = express.Router();

const User = require("../models/User.model")
const Workshop = require("../models/Workshop.model")
const Booking = require("../models/Booking.model");
const { route } = require("./auth.routes");



// all routes are prefixed with /api
// all routes are prefixed with /api/bookings too


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

// route to get one booking
router.get("/:bookingId", async(req, res, next)=>{
    
    try {
        const oneBooking = await Booking.findById(req.params.bookingId)
        res.json(oneBooking)
    } catch (error) {
        next(error)
    }
})

// route to get one booking with workshop details
router.get("/:bookingId/workshopdetails", async(req, res, next)=>{
    
    try {
        const booking = await Booking.findById(req.params.bookingId)
        if(!booking){
            return res.status(404).json({message: "Booking not found"})
        }
        const oneBookingDetails = await Booking.findById(booking)
        .populate("workshopId")
        res.json(oneBookingDetails)
    } catch (error) {
        next(error)
    }
})

router.post("/create", async(req, res, next)=>{
    try {
        const {session, status, cancellation, quantity, workshopId, userId} = req.body
        const createdBooking = await Booking.create(req.body)
        res.status(201).json(createdBooking)
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

module.exports = router;