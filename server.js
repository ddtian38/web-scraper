const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const exphbs = require("express-handlebars");
 app.engine("handlebars", exphbs({defaultLayout: "main"}));
 app.set("view engine, handlebars")

 const htmlRoutes = require("./controllers/htmlRoutes.js")
 const apiRoutes = require("./controllers/apiRoutes.js")

app.use(htmlRoutes);
app.use(apiRoutes);