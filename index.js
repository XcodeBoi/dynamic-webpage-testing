const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const app = express();
var jsonFile = require("./jsontesting.json");
const fs = require("fs")

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("success", {
      username: name,
    });
  } else {
    res.render("failure");
  }
});

app.get("/apiTest", (req, res, next) => {
	jsonFile.idk = jsonFile.idk + 1;
	res.json(jsonFile.idk);
	console.log(jsonFile.idk);
	fs.writeFile("./jsontesting.json", JSON.stringify(jsonFile), function writeJSON(err) {
	  if (err) return console.log(err);
	  console.log(JSON.stringify(jsonFile));
	  console.log('writing to ' + jsonFile);
	});
});

app.get("/repos", async (req, res) => {
  const username = req.query.username || "myogeshchavan97";
  console.log(req)
  console.log(res)
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    }));
    console.log(repos)
    res.render("repos", {
      repos
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting list of repositories");
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});