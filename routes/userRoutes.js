const express = require('express');
const userController = require('../controllers/userController');
const smsController = require('../controllers/smsController');
var userRoutes = express.Router();

const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
    apiKey: "6e3b2874",
    apiSecret: "PsqGUaCcp2N97DXP"
  })

userRoutes.post("/sendSms", smsController.sendSms);
userRoutes.post("/iscodecomper", smsController.codecomper);

userRoutes.post("/create", userController.create);
userRoutes.get("/getAll", userController.getAll);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:_id", userController.deleteUser);
userRoutes.get("/:_id", userController.getUser);


module.exports = userRoutes;
