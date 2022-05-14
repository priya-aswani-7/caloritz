const express = require("express");
const controllers = require("../controllers");
const UserController = require("../controllers/UserController");
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

router.get("/:resource/:id", (req, res) => {
  const resource = req.params.resource;
  const id = req.params.id;
  const controller = controllers[resource];

  if (!controller) {
    return res.json({
      confirmation: "Fail",
      message: "Invalid request.",
    });
  }

  controller
    .getById(id)
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

router.post("/:resource", (req, res) => {
  const resource = req.params.resource;
  const data = req.body;
  const controller = controllers[resource];

  if (!controller || controller === UserController) {
    return res.json({
      confirmation: "Fail",
      message: "Invalid request.",
    });
  }

  controller
    .post(data)
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

router.put("/:resource/:id", (req, res) => {
  const resource = req.params.resource;
  const id = req.params.id;
  const data = req.body;
  const controller = controllers[resource];

  if (!controller || controller === UserController) {
    return res.json({
      confirmation: "Fail",
      message: "Invalid request.",
    });
  }

  controller
    .put(id, data)
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
