const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../models");
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });


router.get("/", (req, res)=>{
    db.Article.find()
        .then((data)=>{
            console.log(data)
            res.render("index", {articles: data})
        })
        .catch((err)=>{
            console.log(err)
        })
    
})

module.exports = router;