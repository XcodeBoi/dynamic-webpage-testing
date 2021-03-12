const mysql = require('mysql');
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
		res.render("index");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server started on port 3000");
});