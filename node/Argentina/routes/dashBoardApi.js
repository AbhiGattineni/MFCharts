const express = require("express");
const router = express.Router();
const dashBoardController = require('../controller/dashboard.js')

router.use(express.json());

router.post('/userdashboard', dashBoardController.getAllTransition)
module.exports=router