
// adding in the libraries, which were installed through npm

const express = require("express");
const app = express();
const path = require("path");
const unsplash = require("unsplash-js");
const axios = require("axios");
const nodeFetch = require("node-fetch"); // didnt want to spend the time working out if axios would work with splash api
const splashApi = unsplash.createApi({accessKey: process.env.splash, fetch: nodeFetch}) // enviroment key for the api
const redis = require("redis");
const redisC = redis.createClient(process.env.REDIS_URL); // declared by the enviroment
const fire = require('firebase-admin'); // alterative db testing

fire.initializeApp({
  credential: fire.credential.cert({
  "type": "service_account",
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  // https://stackoverflow.com/questions/39492587/escaping-issue-with-firebase-privatekey-as-a-heroku-config-variable/41044630#41044630
  // 😑 this caused me more pain than it should have. i wasted minutes trying to solve it myself before googling
  // i figured it had something to do with escaping but printing the value didnt show anything abnormal. ):
  "private_key": process.env.test.replace(/\\n/g, '\n'),
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.processsepcialthing
})
});
const firedb = fire.firestore();

var numCache = 0
firedb.collection("stats").doc("counter").get().then(result => {numCache = result.data().num; console.log(numCache)})

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

app.get("/splashapi", (req, res) => {
  splashApi.photos.getRandom({query: "mountains", orientation: "landscape"}).then(result => { // hhuh callbacks and stuff are making sense now
    res.render("splash", {imag: result.response.urls.regular}); // theres no wayyyyy it would ever return something...
    // that isnt 200 right? right...?
  })
  // tf i troubleshooted that first try??? am i.... understanding this???
})

app.get("/tetro", (req, res) => {
  const imag = "https://tetr.io/res/bg/" + Math.floor(Math.random() * 36).toString()  + ".jpg" // this isnt an api, this is a game who i stole backgrounds from
  res.render("splash", {imag: imag});
})

// i didnt want a friend wiping my progress so i commented it

// app.get("/dbWipe", (req, res) => {
//   // accesses the value in the document that is part of the collection. google firebase firestore hierarchy
//   firedb.collection("stats").doc("counter").set({num: 0}).then(res.json("wipe complete"))
// })

app.get("/api/v1", (req, res) => {
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
    redisC.set("exectuess", (parseInt(dataCache) + 1).toString(), err => {
      if (err) throw err;
    })
  })
  // update the key with the new amount of views. 
  // the string convertion is dumb as anything but redis didnt want to store my poor intger and i didnt want to fix it properly.
  redisC.get("exectuess", (err, reply) => { // promises and callbacks make sense now
    res.header("number", reply);
    if(req.headers.usertype != "bot"){ // the discord bot tells the program its a bot in the headers
      res.render("number", {reply: reply, imag: "https://tetr.io/res/bg/" + Math.floor(Math.random() * 36).toString()  + ".jpg"});
    }
    else {
      res.json(0) // this menas when i add heavy stylisation to the page, the bot wont be slowed down from a shitton
      // of unrelated data
    }
    // the raw data is now communicated as a header to allow for style information to...
    // be associated to the page.
    // see avatarbot:index.js:26 for how that data can be grabed
    // line 55 renders the style page while passing the varible reply with the value of the redis reply
  });
  // holy crap just writting this after finishing... IM SO HAPPY I GET IT NOW
});

// this was doing async things without me telling it to
// so i forced some awaits in
// without the awaits it grabs an outdated number
// perhaps its due to with the way promises are auto handled asynchronously

// waohhhh..... this is way simpler than my redis implementation. 
// promises are actually great compared to callbacks

app.get("/api/v2/deprecated", async (req, res) => {
  await firedb.collection("stats").doc("counter").get().then(async result => {
    await firedb.collection("stats").doc("counter").set({num: result.data().num + 1})
  })
  firedb.collection("stats").doc("counter").get().then(result => {
    res.header("number", result.data().num);
    if(req.headers.usertype != "bot"){ // why do res.json() when you could do res.render()
      res.render("number", {reply: result.data().num, imag: "https://tetr.io/res/bg/" + Math.floor(Math.random() * 36).toString()  + ".jpg"});
    }
    else {
      res.json(0)
    }
  })
})

app.get("/api/v2", async (req, res) => {
  await firedb.collection("stats").doc("counter").get().then(async result => {
    await firedb.collection("stats").doc("counter").set({num: result.data().num + 1})
  })
  firedb.collection("stats").doc("counter").get().then(result => {
    res.header("number", result.data().num);
    if(req.headers.usertype != "bot"){ // why do res.json() when you could do res.render()
      res.render("number", {reply: result.data().num, imag: "https://tetr.io/res/bg/" + Math.floor(Math.random() * 36).toString()  + ".jpg"});
    }
    else {
      res.json(0)
    }
  })
})

app.get("/api", (req, res) => {
  res.json({"api/v2": "latest", "api/v2/deprecated": "deprecated version of api access, though passed params are same", "api/v1": "old api, you can still access redis data"})
})

// heres my epic documenation I just wrote myself just now that I'll but in a sick new blog post or soemthign:
// v1 refers to the old version, which is remaining to be able to access the old data
// v2 refers to a new version of the api which will return different data upon giving it the same
// params..... hence v2!!!!
// deprecated refers to the api being active and usable, but isnt the newest
// and coolest and fastest version (with cache!!!!!)
// uh actually im going to bed cache comes tomorrow.

app.get("/anilist", (req, res) => {
  // documentation 
  // var url = 'https://graphql.anilist.co',
  //     options = {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json',
  //         },
  //         body: JSON.stringify({
  //             query: query,
  //             variables: variables
  //         })
  //     };
  axios.post("https://graphql.anilist.co", {"query": "qeury", "variables": "varible"}).then(result => console.log(result))
})


// app refers to the instance of expressjs, listen tells it what port to start running on.
// due to the heroku enviroment, I use process.env.PORT. heroku sets the port.
// the || 3000 is for when i was able to test this in a local envrioment...
// but I am now unable due to intergration with redis.
// || just refers to do this if that doesnt work. an or operator.
// console.log logs to console im pretty sure thats self explantory but...
// im breaking it down just in case you dont know and so i can properly understand..
// the code myself.

// well i have a local .env file that is on post 5000 now so the || operator doesnt actually do anything.

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});
