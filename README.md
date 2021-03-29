
my cool webapp yeah its mostly just a test project.

[![CodeFactor](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing/badge)](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing)

FAQ:

Why are there so many commits? 
- because i tested in production without never touching redis or a proper node app and without heroku cli

Why won't the background load on the number page?
- Work enviroment networks with proxies tend to block internet pages assoicated with games, and the backgrounds are retrived from TETR.IO

Why did you move from redis to firestore?
- Redis hosted on aws through heroku did not have persistant data across db crashes on its free tier. Firestore does. The code is also simplier for my use case. I'll write a cool blog post on an up coming part of my site

Why did you use socket.io and then firestore on backend? You know firebase has a real time db right?
- yeah i might try that too at some point but like i wanted to try websockets

Why is this called the FAQ? Nobody has ever asked a single question about your repo.
- let a man dream. 

You know nobody who even visits this repo is gonna read the readme beyond the first line right?
- ):

I used some guides. heres a couple i remembered to save:
- https://levelup.gitconnected.com/render-dynamic-content-in-nodejs-using-templates-a58cae681148
- https://livecodestream.dev/post/a-starter-guide-to-building-real-time-applications-with-nodejs/
- https://youtu.be/3yqDxhR2XxE
- https://medium.com/swlh/auto-scroll-in-javascript-283bdf76dc01

heres a really awesome site that is really wondeful and has this really awesome and interesting article on it:
- https://nee.lv/

Env details:
https://skolwebapp.herokuapp.com/
This runs on heroku. It is configured to auto deploy on updates to the repo.
The page will take a little while to load initally cause the server seems to just like sleeping sometimes.

todo:
- websockets
- blog
- sitemap
- markdown dynamic image thing
- electron app injection (into canary)
- neko, anilist api
- styling for number page
- data set visualisation
- anime.js
- prefetch pages javascript
- hardware monitoringm use https://systeminformation.io

more detailed todo:
- websocket page. This may end up being on a different heroku enviroment.
- backend firestore intergration with front end via websocket
- discord bot intergration with firebase
- css styling for chat page
- google sheets api jazz

done:
- cache implentation for latency fix
- lazygit alias cause writing "lazygit" sucks
- windows zsh (powershell sucks) 
- bad news: the windows compatability layer for linux is kinda ass for my use case.
- learnt a bit more about kernals too cause of that. been a while since ive researched low level os tech.
- nice to have but uh yeah might end up with a dual boot ssd.
- heroku cli, i can now test locally. yay. dunno why i didnt do this first.
- .env configured on macos enviroment
- brew autofilling setup on zsh
- migrate default support to firebase db
- migrate data values
