let mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  user: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Article model
module.exports = Comment;