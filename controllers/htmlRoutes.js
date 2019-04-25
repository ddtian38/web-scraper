const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../models");
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });


router.get("/", (req, res)=>{
    
    console.log("retrieving fake news")
    db.Article.find({}, (err, data)=>{
        res.render("index", {articles: data})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

module.exports = router;