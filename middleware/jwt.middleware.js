
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
    const validToken = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ["HS256"],
    })
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




// Instantiate the JWT token validation middleware
// const isAuthenticated = jwt({
//   secret: process.env.TOKEN_SECRET,
//   algorithms: ["HS256"],
//   requestProperty: "payload",
//   getToken: getTokenFromHeaders,
// });

// Function used to extract the JWT token from the request's 'Authorization' Headers
// function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "Bearer"
//   ) {
//     // Get the encoded token string and return it
//     const token = req.headers.authorization.split(" ")[1];
//     return token;
//   }

//   return null;
// }


function isTeacher (req, res, next){
  if (req.user.role === "Teacher"){
    // if (req.user.role === "Teacher"){
      next()
  } else{
      return res.status(401).json({message: "Unauthorized"})
  }
}

// function isAdmin (req, res, next){
//   if (req.user.role === "Admin"){
//       next()
//   } else{
//       return res.status(401).json({message: "Unauthorized"})
//   }
// }


// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated, isTeacher
};
