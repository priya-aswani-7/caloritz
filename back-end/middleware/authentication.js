const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      confirmation: "fail",
      message:
        "Unauthorized request. A token is required to authenticate your access.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      confirmation: "fail",
      message: "Invalid token.",
    });
  }

  return next();
};

module.exports = authentication;
