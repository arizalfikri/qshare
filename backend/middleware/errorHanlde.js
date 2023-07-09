const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "Invalid email/password") {
    code = 401;
    message = err.name;
  }

  if (
    err.name === "Email is required" ||
    err.name === "Password is required" ||
    err.name === "Name is required" ||
    err.name === "Quantity is required" ||
    err.name === "Price is required" ||
    err.name === "too many orders" ||
    err.name === "product run out"
  ) {
    code = 400;
    message = err.name;
  }

  if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  }

  if (err.name === "Name product can't be the same") {
    code = 403;
    message = "Name product is already";
  }

  if (err.name === "You are not auhorized" || err.name === "Order too much") {
    code = 403;
    message = err.name;
  }

  res.status(code).json({ statusCode: code, message });
};

module.exports = errorHandler;
