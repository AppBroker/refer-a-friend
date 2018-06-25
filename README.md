# Refer a Friend Library (Vanilla ES6 Javascript and Node)

Single refer a friend component for use within a large-scale application.   (Input: ES6, Output: universal library)

## Features

* Webpack based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere, working with an existing large scale application.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).
* Styles with [SASS](https://sass-lang.com/).

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*The files under the `src` and `styles` folder are the ones that are distributed to the dist folder.*

## Getting Started
Download the library:

git clone https://github.com/AppBroker/refer-a-friend
cd refer-a-friend

## Starting the app
Install the app

(make sure you have the latest versions of Node/NPM/Yarn to run)

npm install


Run Locally


npm run dev


Build


npm run build


Go to http://localhost:8080 to view the refer a friend application on Dev. Alternatively you can view a [DEMO](https://refer-a-friend.eu-gb.mybluemix.net) here.

## Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `dist` folder
* `yarn dev` or `npm run dev` - produces development version of your src and styles
* `yarn test` or `npm run test` - well ... runs the tests

## Thoughts and To Do Items
Clean up - I built a project in the past which had the basic shell structure with most of what I needed, I did a fair bit of rigging with webpack to get ES6 up and running with webpack and babel, so this library is geared for async calls like await now as seen in the submission api. I actually spent more time rigging up the build than working on the features.

Validation - There is only very basic validation on the rows, I know this wasnt a requirement but with about 3hrs on this ran out of time, but could quite easily be added to the rows and the submission.

Submit API - Ive created an example stub API method for the front end which can be easily swapped for a real submission api via, I would have set up an endpoint for this within express but wasnt sure if it would be required and ran out of time. 

Data change validation - When a user adds a new row Im storing that data in localStorage, there are some additional dirty checking methods I should bind to the change handlers on the view so that the changes to a previous row would update the store. This would also tie in with validation, Ive made some comments within the code to identify where and how this should happen, but for the sake of brevity and time I've ommited the functionality for now.

Unit Tests - I've set up the library for testing but due to time constraints I've not had time to look into why the tests are throwing, if I get some more time Id look into it.

Minification - CSS is bing built to a minified named.min.css file, but Ive not added the minification plugin to it yet. I'd get to that too.

Unmounting - I'm using eventlisteners to bind and trigger event handlers, Ive not paid much attention to removing these listeners for now, in a bigger application this would be essential.

