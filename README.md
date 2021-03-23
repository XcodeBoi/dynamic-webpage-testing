
my cool webapp yeah its mostly just a test project.

[![CodeFactor](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing/badge)](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing)

FAQ:
Why are there so many commits? 
- because i tested in production without never touching redis or a proper node app and without heroku cli

Why won't the background load on the number page?
- Work enviroment networks with proxies tend to block internet pages assoicated with games, and the backgrounds are retrived from TETR.IO

Why did you move from redis to firestore?
- Redis hosted on aws through heroku did not have persistant data across db crashes on its free tier. Firestore does. The code is also simplier for my use case. I'll write a cool blog post on an up coming part of my site

I used some guides. heres some i saved:
- https://levelup.gitconnected.com/render-dynamic-content-in-nodejs-using-templates-a58cae681148
- https://livecodestream.dev/post/a-starter-guide-to-building-real-time-applications-with-nodejs/

heres a really awesome site that is really wondeful and has this really awesome and interesting article on it:
- https://nee.lv/

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

- windows zsh + brew + whatnot(powershell sucks)


done:
- lazygit alias cause writing "lazygit" sucks
- heroku cli, i can now test locally. yay. dunno why i didnt do this first.
- .env configured on macos enviroment
- brew autofilling setup on zsh
- migrate default support to firebase db
- migrate data values
