const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const app = express();
var jsonFile = require("./jsontesting.json");
const fs = require("fs")
const redis = require("redis");
const redisC = redis.createClient(process.env.REDIS_URL);
const { promisify } = require("util");

redisC.on("error", function(error) { // yeah i add this like im gonna know what to do if it errors
  console.error(error);
});

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

  // this is a mess and a half ill fix it tomororw.

  var dataCache = 0


  // ok this was an attempt but its practically suedo code now.
  const initData = promisify(redisC.set("exectues", 0)).bind(redisC);
  const chkData = promisify(redisC.exists("exectues")).bind(redisC);
  chkData.then(result => dataCache = result); // is this a call back i hope this is a call back i dont even know can somebody teach me please
  if(dataCache == 0) {
    initData.then(result => console.log(result))
  }

  const getData = promisify(redisC.get("exectues")).bind(redisC);
  getData.then(result => dataCache = result);

  const uptData = promisify(redisC.set("exectues", dataCache + 1).bind(redisC));
  uptData.then(result => console.log(`updated ${dataCache}`))

  getData.then(result => res.json(result))
});

app.get("/testpoint", (req, res, next) => {
	await redisC.set("exectues", 0)
	console.log(await redisC.get("exectues"))
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

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});