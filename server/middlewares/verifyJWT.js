/*
Summary Comment:
This code defines a middleware function called verifyJWT that is used to verify JSON Web Tokens (JWT) in an HTTP request. It checks if the request has an "Authorization" header, extracts the token from it, and verifies the token using a secret key stored in the environment variables. If the token is valid, it decodes the token and attaches the decoded user information to the request object. Finally, it calls the next middleware function in the request processing pipeline.
*/
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = {
      id: decoded.id,
      schoolCode: decoded.schoolCode,
      username: decoded.name,
    };
    next();
  });
};

module.exports = verifyJWT;
