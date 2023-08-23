// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const cors = require("cors")
const express = require("express");
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const rateLimiter = require("express-rate-limit")
const jwt = require("jsonwebtoken")
const { errorHandler, notFoundHandler } = require("./error-handling/index")
const User = require("./models/User.model")
const PORT = 5005




// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// additional protection of app
// Setting limiter
const limiter = rateLimiter({
	windowMs: 1000,
	max: 100,
	standardHeaders: true,
})



// MIDDLEWARES

app.use(
	cors({
		origin: [
			"http://localhost:5174",
			"http://127.0.0.1:5174",
			process.env.ORIGIN,
		],
	})
)

// Helmet, simple, efficient, wear your helmet.
app.use(helmet())
app.use(limiter)
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


// 👇 Start handling routes here

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// app.get("/docs", (req, res) => {
// 	res.sendFile(__dirname + "/views/docs.html")
// })

// Nested routing
// Any request starting by /api will go in the index route.

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


// Import the custom error handling middleware
// const {errorHandler, notFoundHandler} = require("./error-handling")

//Set up custom error handling middleware
app.use(errorHandler)
app.use(notFoundHandler)



// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
