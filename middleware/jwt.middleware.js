
const jwt = require("jsonwebtoken")
const User = require("./../models/User.model")


// Instantiate the JWT token validation middleware
async function isAuthenticated(req,res,next){
  try {
    let token = req.headers.authorization
    if(!token){
      return res.status(401).json({message:" No token found"})
    }
    token = token.replace("Bearer","")
    console.log(token)
    const validToken = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    if (validToken){
      console.log(validToken)
      const loggedUser = await User.findOne({email: validToken.email})
      // store the connected user on req.user
      req.user = loggedUser
      next()
    }
  } catch (error) {
    return res.status(401).json({message: "Denied", error: error.message})
  }
}


function isTeacher (req, res, next){
  if (req.user.role === "Teacher"){
    // if (req.user.role === "Teacher"){
      next()
  } else{
      return res.status(401).json({message: "Unauthorized"})
  }
}

function isAdmin (req, res, next){
  if (req.user.role === "Admin"){
      next()
  } else{
      return res.status(401).json({message: "Unauthorized"})
  }
}


// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated, isTeacher, isAdmin
};
