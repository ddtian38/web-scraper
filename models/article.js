const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title:{
        type: String,
        required: true
    },

    summary:{
        type: String,
        required: true
    },

    link:{
        type: String,
        required: true
    },

    img:{
        type: String,
        required: true,
        default: "https://www.humanrights.gov.au/sites/default/files/styles/listing-news-thumbnails/public/news_image_placeholders/n_al_placeholder.jpg?itok=eFwe_ILl"
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;