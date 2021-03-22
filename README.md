
my cool webapp yeah its mostly just a test project.

[![CodeFactor](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing/badge)](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing)

FAQ:
Why are there so many commits? 
- because i tested in production without never touching redis or a proper node app and without heroku cli
Why won't the background load on the number page?
- Work enviroment networks with proxies tend to block internet pages assoicated with games, and the backgrounds are retrived from 
TETR.IO
Why did you move from redis to firestore?
- Redis hosted on aws through heroku did not have persistant data across db crashes on its free tier. Firestore does. The code is also simplier for my use case, and is lower latency. I think. (just checked this 10 minutes later - it isnt lower latency considering heroku is hosted on aws too so like its actually instant on redis cause its reading from a local source but uh yeah)

I used some guides. heres one i remembered to save:
- https://levelup.gitconnected.com/render-dynamic-content-in-nodejs-using-templates-a58cae681148

Env details:
https://skolwebapp.herokuapp.com/
This runs on heroku. It is configured to auto deploy on updates to the repo.
The page will take a little while to load initally cause the server seems to just like sleeping sometimes.

todo:
- neko api
- anilist api
- friend data
- discord bot
- anime.js
- blog
- sitemap spiderweb
- real time

other todo

- styling for number page

done:
- heroku cli, i can now test locally. yay. dunno why i didnt do this first.
- .env configured on macos enviroment
- brew autofilling setup on zsh
- migrate default support to firebase db
- migrate data values