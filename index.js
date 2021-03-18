
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
  redisC.exists("exectuess", (err, reply) => {
    if (err) throw err;
    console.log(reply)
    if(reply == 0) {
      redisC.set("exectuess", "0") // why is this a string if im doing maths? becuase redis only works with string types. and some other types. but its cleanest with string types. i hope.
    }
  })
  redisC.get("exectuess", (err, reply) => {
    if (err) throw err;
    console.log("get reply: " + reply);
    var dataCache = reply
    redisC.set("exectuess", (parseInt(dataCache) + 1).toString(), (err, reply) => {
      if (err) throw err;
    })
  })
  // update the key with the new amount of views. 
  // the string convertion is dumb as anything but redis didnt want to store my poor intger and i didnt want to fix it properly.
  redisC.get("exectuess", (err, reply) => {
    res.header("number", reply);
    if(req.headers.usertype != "bot"){ // the discord bot tells the program its a bot in the headers
      res.render("number", {reply: reply});
    }
    else {
      res.json(0) // this menas when i add heavy stylisation to the page, the bot wont be slowed down from a shitton
      // of unrelated data
    }
    // the raw data is now communicated as a header to allow for style information to...
    // be associated to the page.
    // see avatarbot:index.js:27 for how that data can be grabed
    // line 55 renders the style page while passing the varible reply with the value of the redis reply
  });
  // holy crap just writting this after finishing... IM SO HAPPY I GET IT NOW
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
