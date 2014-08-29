main repo here:
github.com/Ineffective/Pi-jAutomation433
this is just the frontend

### Frontend
The Frontend is based on Ionic and I use yeoman, bower and grunt. To get the frontend running do:
`npm install` in the frontend folder. then do `bower install` as well. This should install all neccessary things. If you havent installed the upper mentioned tools yet make sure to do so (just google them and you'll find out how)

you can use `grunt server` to preview the UI or deploy it to your device of choice. be aware that the code won't be able to access the backend if you don't disable the websecurity in chrome. to disable start chrome like this (mac):
`open -a Google\ Chrome --args --disable-web-security`
Otherwise just deploy to a device like `ionic run android`

## Starting the server
