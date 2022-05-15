const express = require("express");
const controllers = require("../controllers");
const FoodEntryController = require("../controllers/FoodEntryController");
const StatisticController = require("../controllers/StatisticController");
const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentication");
const router = express.Router();

//unprotected endpoint
//anyone can access this to login and receive an authentication token
router.post("/user/login", (req, res) => {
  const data = req.body;

  UserController.login(data)
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

//unprotected endpoint
//anyone can access this route to create a new user for themselves and receive an authentication token
router.post("/user/register", (req, res) => {
  const data = req.body;

  UserController.post(data)
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

//authenticated & authorized endpoint
//admin can access anyone's food entries
//users can only access their own food entries
router.get("/user/:id/foodentry", authentication, (req, res) => {
  const id = req.params.id;
  if (req.user.type !== "admin" && req.user.userId !== id) {
    return res.status(403).json({
      confirmation: "fail",
      error:
        "Unauthorized request. You do not have permissions to access another user's food entries.",
    });
  }
  let startDate = req.query.startDate || 0;
  let endDate = req.query.endDate || new Date().getTime();

  FoodEntryController.getByUserId(id, startDate, endDate)
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

//authenticated & authorized endpoint
//only admins can access users list, food entry list, statistics
router.get("/:resource", authentication, (req, res) => {
  const resource = req.params.resource;
  if (req.user.type !== "admin") {
    return res.status(403).json({
      confirmation: "fail",
      error: `Unauthorized request. You do not have sufficient permissions to access ${
        resource === "user"
          ? "users list"
          : resource === "foodentry"
          ? "food entries list"
          : "statistics"
      }.`,
    });
  }
  const filter = req.query;
  const controller = controllers[resource];

  if (!controller) {
    return res.json({
      confirmation: "Fail",
      message: "Invalid request.",
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

//authenticated & authorized endpoint
//admins can view individual users
//users can only view themselves
router.get("/:resource/:id", authentication, (req, res) => {
  const id = req.params.id;
  if (req.user.type !== "admin" && req.user.userId !== id) {
    return res.status(403).json({
      confirmation: "fail",
      error: `Unauthorized request. You do not have sufficient permissions to access another user's details.`,
    });
  }
  const resource = req.params.resource;

  const controller = controllers[resource];

  if (
    !controller ||
    [FoodEntryController, StatisticController].includes(controller)
  ) {
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

//authenticated & authorized endpoint
//admins can create food entries for any user
//users can create food entries only for themselves
router.post("/:resource", authentication, (req, res) => {
  const resource = req.params.resource;
  const data = req.body;
  if (req.user.type !== "admin" && req.user.userId !== req.body.user) {
    return res.status(403).json({
      confirmation: "fail",
      error: `Unauthorized request. You do not have sufficient permissions to create a food entry for another user.`,
    });
  }
  const controller = controllers[resource];

  if (
    !controller ||
    [UserController, StatisticController].includes(controller)
  ) {
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

//authenticated & authorized endpoint
//only admins can edit food entries
router.put("/:resource/:id", authentication, (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({
      confirmation: "fail",
      error: `Unauthorized request. You do not have sufficient permissions to edit food entries.`,
    });
  }
  const resource = req.params.resource;
  const id = req.params.id;
  const data = req.body;
  const controller = controllers[resource];

  if (
    !controller ||
    [UserController, StatisticController].includes(controller)
  ) {
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

//authenticated & authorized endpoint
//only admins can delete food entries
router.delete("/:resource/:id", authentication, (req, res) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({
      confirmation: "fail",
      error: `Unauthorized request. You do not have sufficient permissions to delete food entries.`,
    });
  }
  const resource = req.params.resource;
  const id = req.params.id;
  const controller = controllers[resource];

  if (
    !controller ||
    [UserController, StatisticController].includes(controller)
  ) {
    return res.json({
      confirmation: "Fail",
      message: "Invalid request.",
    });
  }

  controller
    .delete(id)
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
