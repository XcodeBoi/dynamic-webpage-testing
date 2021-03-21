
my cool webapp yeah its mostly just a test project.

[![CodeFactor](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing/badge)](https://www.codefactor.io/repository/github/xcodeboi/dynamic-webpage-testing)

FAQ:
Why are there so many commits? 
- because i tested in production without never touching redis or a proper node app and without heroku cli
Why won't the background load on the number page?
- Work enviroment networks with proxies tend to block internet pages assoicated with games, and the backgrounds are retrived from 
TETR.IO


I used some guides. heres one i remembered to save:
- https://levelup.gitconnected.com/render-dynamic-content-in-nodejs-using-templates-a58cae681148

todo:
- neko api
- friend data
- discord bot
- anime.js

Env details:
This runs on heroku. It is configured to auto deploy on updates to the repo.

https://skolwebapp.herokuapp.com/

The page will take a little while to load initally cause the server seems to just like sleeping sometimes.

The program has now been adapted to run on a db hosted by heroku, and as such it cannot be run on a local enviroment.

other todo:
- set up heroku pipelines for better testing
- styling for number page
- firebase authentication for db

