const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../models");
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });




module.exports = router;