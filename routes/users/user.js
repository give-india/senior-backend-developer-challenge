const Sequelize = require("sequelize");
const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../../Models/Model");

const userdata = [
  { name: "dasd", isactive: true },
  { name: "bfd", isactive: true },
  { name: "dhjasd", isactive: true },
  { name: "yeryt", isactive: true },
  { name: "hgjyety", isactive: true },
  { name: "dasdhjghj", isactive: true },
  { name: "tretet", isactive: true },
];

//Create random users if no users
router.post("/createRandomUsers", async (request, response, next) => {
  const usersFound = await User.findAll({});
  if (usersFound.length == 0) {
    for (let i = 0; i < userdata.length; i++) {
      await User.create({
        name: userdata[i].name,
        isactive: userdata[i].isactive,
      });
    }
    return response.status(200).json({ message: "Users Created" });
  } else
    return response
      .status(200)
      .json({ errorCode: 204, errorMessage: "Some Users already found" });
});

//Get all users
router.get("/allusers", async (request, response, next) => {
  const usersFound = await User.findAll({
    attributes: ["user_id", "name", "isactive"],
    order: [["user_id", "DESC"]],
  });
  return response.status(200).json(usersFound);
});

//Get all users
router.get("/allActiveusers", async (request, response, next) => {
  const usersFound = await User.findAll({
    attributes: ["user_id", "name", "isactive"],
    where: { isactive: true },
    order: [["user_id", "DESC"]],
  });
  return response.status(200).json(usersFound);
});

module.exports = router;
