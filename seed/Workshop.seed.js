require ("dotenv").config

require("../db/index")

const Workshop = require("../models/Workshop.model")
const User = require("../models/User.model")
const Booking = require("../models/Booking.model")

const workshops = [
    {
        title: "making ramen soup",
        category: "Cooking",
        subCategory: "Japanese Cuisine",
    },
    {
        title: "making spring rolls",
        category: "Cooking",
        subCategory: "Chinese Cuisine",
    },
]


const users = [{name: "Marc"}, {name:"Jerome"}, {name:"Mimi"}]


async function seed(){
    try {
        await User.deleteMany()
        const allUsers = await User.create(users)
        await Workshop.deleteMany()
        for (let workshop of workshops){
            const foundUser = await User.findOne({name: workshop.teacher})
            workshop.teacher = foundUser._id
        }
        await Workshop.create(workshops)
    } catch (error) {
        console.log(error)
    }
    finally {
        process.exit()
    }
}

seed()

function randomElement(arr){
    return arr[Math.floor(Math.random() * arr.length)]._id
}