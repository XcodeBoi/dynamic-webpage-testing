
// adding in the libraries, which were installed through npm

const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const redis = require("redis");
const redisC = redis.createClient(process.env.REDIS_URL); // declared by the enviroment

redisC.on("error", function(error) { // yeah i add this like im gonna know what to do if it errors
  console.error(error);
});

app.set("view engine", "ejs"); // support for ejs
app.use(express.static(path.join(__dirname, "public"))); // This means when I reference files it will prefix public to the path.

// app refers to the express framework.
// "/" is the accessed page.
// req is the data that was recieved from the client.
// res it what was sent back.
// .get is the type of request. like vs put and post and whatnot.
// the arrow is just using arrow functions, which at an ultra abstract level are the same.
// i dont know enough about it but it appears to be used in cases where something is triggered and modified.
// res modifies the response, .render tells it which file to render. This ties into the ejs view engine.

app.get("/", (req, res) => { 
  res.render("index");
});

app.get("/apiTest", (req, res) => {
  // redis is used here for persistant data. "persistant" because if the db crashes i loose everything caues i didnt pay,
  // but more persistant than storing it as a varible and loosing data over restarts.
  if(redisC.exists("exectues") == false) { // if the key doesnt exist, create it.
    redisC.set("exectues", "0", (err, reply) => {
    if (err) throw err;
    console.log(err);
    console.log(reply);
  });
  };
  // not manipulating this varible beyond using it as a reference value.
  // const exists for the sake of memory efficency right? 
  const dataCache = redisC.get("exectues", (err, reply) => {
    if (err) throw err;
    console.log(reply);

  })
  console.log(dataCache);
  console.log((parseInt(dataCache) + 1).toString());
  redisC.set("exectues", (parseInt(dataCache) + 1).toString(), (err, reply) => {
    if (err) throw err;
    console.log(reply);
    
  });

  // update the key with the new amount of views. 
  // the string convertion is dumb as anything but redis didnt want to store my poor intger and i didnt want to fix it properly.
  res.json(redisC.get("exectues"));
});

// forgot i was working with persisant data and uh it sucked.
app.get("/reset", (req, res) => {
  redisC.del("exectues")
  res.json("yeah its done. good shit go home now.")
})

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

// app refers to the instance of expressjs, listen tells it what port to start running on.
// due to the heroku enviroment, I use process.env.PORT. heroku sets the port.
// the || 3000 is for when i was able to test this in a local envrioment...
// but I am now unable due to intergration with redis.
// || just refers to do this if that doesnt work. an or operator.
// console.log logs to console im pretty sure thats self explantory but...
// im breaking it down just in case you dont know and so i can properly understand..
// the code myself.

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});