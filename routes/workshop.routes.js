const express = require("express");
const router = express.Router();
// const Workshop = require(...path)

//GET ALL WORKSHOPS

router.get("/", async (req, res, next) => {
    try {
        const allWorkShops = await Workshop.find()

    }catch (error) {
        console.log(error);
    }
})


// Get one workshop
// router.get

//POST



//UPDATE


//DELETE



module.exports = router;