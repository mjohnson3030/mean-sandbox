# MEAN Base app

Based on https://github.com/pshort/node-angular-boilerplate

Mongo Express Angular Node

This is a quick repo to get you up and running with node and express 4.0 with connect middleware and mongoose to connect to mongo db. The client app is using angular and bootstrap, both being served over CDN so the files are not in this repo. All that is required besides this is node installed and mongo installed and running on localhost. You can edit the mongo connection string in the database.js file found in the config folder.

## Structure

```javascript

	base
	  |
	  |-config						// application configuration
	  |		|- database.js 			// contains the mongo connection string
	  |
	  |-public						// static file serve
	  |		|-app 					// angular app
	  |		|	|-views				// angular views
	  |		|	|	|- main.html 	// main angular view template
	  |		|	|-app.js  			// angular application
	  |		|-index.html 			// main view layout with angular hooks
	  |		
	  |-routes						// node routes folder
	  |		|-index.js 				// routes for the app (non resource routes)
	  |		|-routeTable.js 		// hooks up route files to method handlers in express
	  |
	  |-package.json 				// npm package file (edit to change the nodemon dep)
	  |-readme.md 					// THIS FILE!
	  |-server.js 					// node entry point + server definition.

```

## Downloads
1. MongoDB https://www.mongodb.com/try/download/community
2. Node https://nodejs.org/en/download/
3. VSCode https://code.visualstudio.com/Download
4. git https://git-scm.com/downloads

## Running

1. Make sure you have mongo running locally. If you dont the comment out the mongoose connection stuff in server.js
2. `npm start`

`npm start` will run nodemon, if you dont have it installed globally then you can do so via

```javascript

npm install nodemon -g

```

If you don't want nodemon then you can change the start command in the package.json file to `node server.js` or whatever you want.