const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isAuthenticated } = require("../middleware/jwt.middleware")

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;
// const rounds = 12

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
  try{
    const { email, password } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }


  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }


  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
    const existingUser = await User.findOne({email: email})
    // If the user with the same email already exists, send an error response
    if (existingUser){
      return res.status(400).json({ message: "Email already exists." });
    }

      // If email is unique, proceed to hash the password
      // Generate a new salt from the rounds
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      const newUser = await User.create({ 
        email, 
        password: hashedPassword, 

       });
      const displayedUser = {
      
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
          email: newUser.email,
          // firstName : newUser.firstName,
          // lastName: newUser.lastName,
          _id: newUser._id,
          // role: newUser.role,
          // phone: newUser.phone,
          // photo: newUser.photo,
          // bio: newUser.bio,
          // Create a new object that doesn't expose the password
      }
      // Send a json response containing the user object
      res.status(201).json({ message: "Success!", user: displayedUser });
  
    }
      
    catch(error) {
      next(error)
    }; // In this case, we send error handling to the error handling middleware.
});





// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res, next) => {
  try{

    const { email, password } = req.body;

    // Check if email or password are provided as empty string
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }


		// Try to find one user w/ same email, select email and password
		const existingUser = await User.findOne(
			{ email },{ password: 1, email: 1 }
		)
		if (!existingUser) {
			return res.status(400).json({ message: "Wrong credentials" })
		}
		// console.log(existingUser)
		// Using bcrypt to compare the user provided password and the
		// hash in my database.
     // Compare the provided password with the one saved in the database
		const correctPassword = await bcrypt.compare(password, existingUser.password)
		if (!correctPassword) {
			return res.status(400).json({ message: "Wrong credentials" })
		}

    // generate the token
  // Create an object that will be set as the token payload
  const payload = { email: existingUser.email };

  // Create a JSON Web Token and sign it
  const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "6h",
  });

    // Send the token as the response
    res.status(200).json({ token: authToken });

  }
    catch(error){
      next(error)
     // In this case, we send error handling to the error handling middleware.
};
})


// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.user);

  // Send back the token payload object containing the user data
  res.status(200).json({user: req.user});
  // res.status(200).json({user: req.user});
  
});

module.exports = router;
