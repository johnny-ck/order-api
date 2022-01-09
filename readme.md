please use your own google api key by set env var GOOGLE_MAPS_API_KEY

to start as production build, please run
`./start.sh`

to run test, please install node and run
`npm install`
`./start.sh`
`npm run test`

to dev, please install node and run
`npm install`
then change the db path to localhost instead of mongo and run
`./start.sh`
`npm run dev`

todo
-extract more env var
-more test case
-use yarn instead of npm
-extract service layer
-code refactor
-add login to db
