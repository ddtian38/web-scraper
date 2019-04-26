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
                    console.log("Adding article to database")
                })
                .catch((err)=>{
                    console.log(err)
                })

            })

            res.send("done")
           
        })
        .catch((err)=>{
            console.log("Cannot find fake news.")
            res.status(500).send()
        })
})

router.get("/api/articles", (req, res)=>{
    db.Article.find({}, (err,data)=>{
        res.json(data)
    })
    .catch((err)=>{
            console.log(err)
    })
})

router.delete("/api/articles", (req, res) => {
    console.log("deleting articles")
    db.Article.deleteMany({}, (err, response)=>{
        console.log("Article database has been cleared.")
        db.Comment.deleteMany({}, (err, response)=>{
            console.log("Comment database has been cleared.")
            res.send("Database has been cleared")
        })
        
    })
    
})


router.post("/api/comments", (req, res)=>{
    console.log(req.body)
    let data = {
        user: req.body.user,
        content: req.body.comment
    }
    db.Comment.create(data, (err, {_id, user, content}) =>{
       let articleId = req.body.id
       let commentId = _id;
       db.Article.updateOne({
                        _id: articleId
                    }, 
                    {
                        $push: {
                            comments: commentId
                            }
                    }, (err, dbCommentResponse)=>{
                        console.log(dbCommentResponse)
                        res.send({_id, user, content})
                    })
    })
})

router.get("/api/comments", (req, res)=>{
    db.Comment.find({}, (err, data)=>{
        res.json(data)
    })
})

router.delete("/api/comments/:id", (req, res)=>{
    db.Comment.deleteOne({_id: req.params.id}, (err, data)=>{
        res.send(data)
    })
})

router.get("/article/:id/comments", (req, res)=>{
    let articleId = req.params.id;
    db.Article.find({_id: articleId})
        .populate("comments")
        .then((data)=>{
            res.json(data[0].comments)
        })
        .catch((err)=>{
            res.send("No comments")
        })
})

module.exports = router;