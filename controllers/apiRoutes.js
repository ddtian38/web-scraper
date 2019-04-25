const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

router.get("/scrape", (req, res)=>{
    const url = "https://www.infowars.com/"
    axios.get(url)
        .then((response)=>{
            const $ = cheerio.load(response.data)
            let arr = []
            $("div.article-content").each((i,ele) => {
                let result = {
                    title: $(ele).children("h3").text(),
                    summary: $(ele).children(".entry-subtitle").text(),
                    link: $(ele).children("h3").children().attr("href"),
                    img: $(ele).prev("div.thumbnail").find("img").attr("src")
                }
                // console.log(result)
                arr.push(result)

                db.Article.create(result)
                .then((doc)=>{
                    console.log(doc)
                })
                .catch((err)=>{
                    console.log(err)
                })

            })
        
            res.send(arr)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

router.get("/api/articles", (req, res)=>{
    db.Article.find()
        .then((data)=>{
            console.log(data)
            res.json(data)
        })
        .catch((err)=>{
            console.log(err)
        })
})


router.post("/comments", (req, res)=>{
    
})


router.get("/comments", (req, res)=>{

})

module.exports = router;