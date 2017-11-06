# insight

Insight is for Fitbit users who want to know more about their data. Currently, Fitbit does not have a consumer-facing app that correlates the myriad of data that their devices collect. While their app is certainly useful, insight is built for those who want to know more about what's going on. Insight's end goal is to empower users to look deeper, identify trends and find correlations.


Insight is built on two separate applications. This repo is for the React front-end, currently running live here: https://mdevoe12.github.io/fitbit-front-end-react/

The back-end is a Ruby-on-Rails server currently hosted on Heroku: https://insight-api.herokuapp.com/ , the GitHub repo can be found here: https://github.com/mdevoe12/fitbit-backend

## Getting Started

See below to get started.

### Prerequisites

Note: the core of insight's front-end is built using Node.js, React, JavaScript and Node Package Manager (npm).

Please ensure Node.js and React are installed on your local machine before continuing. If you're unsure if either are currently installed on your machine. Please run the following from your terminal:

```
$ node -v
```

and

```
$ npm -v
```

If neither are installed, the following tutorial is an excellent source to get you up and running. NOTE: Only follow the tutorial through the end of Part I. Do not start Part II.

https://medium.com/@vikasharry03/react-setup-on-local-computer-912f9a551af3

### Installing

1) Fork and then clone this repository to your local machine

```
$ git clone git@github.com:mdevoe12/fitbit-front-end-react.git
```

2) Change directories to the newly cloned down repo

```
$ cd fitbit-front-end-react
```

3) Once in the directory, install node packages and dependencies, run:
   (this may take a bit of time)

```
$ npm install
```

4) The master branch of this repository is configured for production. To be able to run this current repository in development, you will need to do the following:

a) Open the repository in your preferred text editor
b) Global find and replace https://mdevoe12.github.io/fitbit-front-end-react/ with http://localhost:8080.

5) To launch this application in development, run:

```
$ npm start
```

It may take a minute or so for the server to launch and webpack to compile the code. Upon success, you can now browse to http://localhost:8080. This local machine will be configured to connect to the hosted heroku server.


## Built With

* [ReactJS](https://reactjs.org/) - Front-end Library
* [ReCharts](http://recharts.org/#/en-US/) - React Chart Rendering

## Contributing

If you would like to contribute, please fork and clone this repo. After making your proposed changes, please submit a pull request to the original repository with mdevoe12 tagged in the PR.
