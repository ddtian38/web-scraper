const express = require("express");
const exphbs = require("express-handlebars");


const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("public"));


 app.engine("handlebars", exphbs({defaultLayout: "main"}));
 app.set("view engine", "handlebars");

 const htmlRoutes = require("./controllers/htmlRoutes.js")
 const apiRoutes = require("./controllers/apiRoutes.js")

app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, ()=>{
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    )
})