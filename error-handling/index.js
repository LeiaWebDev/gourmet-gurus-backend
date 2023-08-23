

function errorHandler (error, req, res, next) {
  // This middleware has 4 arguments. It will run whenever `next(error)` is called.

  // Log the error first
  console.error("ERROR", req.method, req.path, error);
let status = 500
if (error.name === "ValidationError") {
  status = 400
}
  // Check if the response was already sent, as sending a response twice for the same request will cause an error.
  if (!res.headersSent) {

    // If not, send a response with status code 500 and a generic error message
    res
      .status(status)
      .json({ message: error.message, error: error.name});
  }
};

function notFoundHandler (req, res, next) {
  // This middleware will run whenever the requested route is not found
  res
    .status(404)
    .json({ message: "This route does not exist" });
};


module.exports = {errorHandler, notFoundHandler}
// module.exports = (app) => {
  // app.use((req, res, next) => {
  //   // this middleware runs whenever requested page is not available
  //   res.status(404).json({ message: "This route does not exist" });
  // });

  // app.use((err, req, res, next) => {
  //   // whenever you call next(err), this middleware will handle the error
  //   // always logs the error
  //   console.error("ERROR", req.method, req.path, err);

    // // only render if the error ocurred before sending the response
    // if (!res.headersSent) {
    //   res.status(500).json({
    //     message: "Internal server error. Check the server console",
    //   });
//     }
//   });
// };
