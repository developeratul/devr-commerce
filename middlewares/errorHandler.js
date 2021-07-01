// 404 error handler
function notFoundHandler(req, res, next) {
  next("Your requested route was not found");
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next("There was an unexpected error");
  } else {
    if (err.message) {
      res.status(err.code || 500).send(err.message);
    } else {
      res.status(err.code || 500).send(err);
    }
  }
}

module.exports = { errorHandler, notFoundHandler };
