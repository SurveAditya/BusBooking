const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware.js");

let busname=  "None";
let running = "stop";
router.post("/setlocation", async (req, res) => {
    
    try {
       busname = req.body.busname;
       running = req.body.running;
       console.log(busname,running);

      res.send({
        message: "Successful",
      });
    } catch (error) {
      res.send({
        message: error.message,
      });
    }
  });

  router.post("/getlocation", async (req, res) => {
    try {
      res.send({
        busname:busname,
        running:running, 
      });
    } catch (error) {
      res.send({
        message: error.message,
      });
    }
  });

  module.exports = router;