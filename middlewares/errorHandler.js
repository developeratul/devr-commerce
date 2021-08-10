// 404 error handler
function notFoundHandler(req, res, next) {
  next({ message: "Your requested route was not found", status: 404 });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next("There was an unexpected error");
  } else {
    if (err.message) {
      res.status(err.status || 500).send(err.message);
    } else {
      res.status(err.status || 500).send(err);
    }
  }
}

module.exports = { errorHandler, notFoundHandler };
