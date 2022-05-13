const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.get("/:resource", (req, res) => {
  const resource = req.params.resource;
  const filter = req.query;
  const controller = controllers[resource];

  if (!controller) {
    return res.json({
      confirmation: "Fail",
      message: "Invalid request. Resource undefined.",
    });
  }

  controller
    .get(filter)
    .then((data) => {
      res.json({
        confirmation: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.json({
        confirmation: "fail",
        error: error.message,
      });
    });
});

module.exports = router;
