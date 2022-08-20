[![ci](https://github.com/strandgeek/web3-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/strandgeek/web3-boilerplate/actions/workflows/build.yml) ![GitHub](https://img.shields.io/github/license/strandgeek/web3-boilerplate) ![GitHub issues](https://img.shields.io/github/issues/strandgeek/web3-boilerplate) ![GitHub last commit](https://img.shields.io/github/last-commit/strandgeek/web3-boilerplate)

# MyProjectName

## Table of Contents
1. [About](#about)
2. [Quick Links](#quick-links)
3. [Stack](#stack)
4. [Running in Production](#running-in-production)
5. [Development](#development)


--------

## Quick Links
- [📹 Video Presentation](https://TODO)
- [📕 Techinical Overview](https://TODO)
- [📄 Smart Contract](https://TODO)
--------

## About

Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.

Donec rutrum congue leo eget malesuada. Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.


## Stack

- api: NodeJS + Typescript + ExpressJS
- webapp: ReactJS + Typescript

TODO: Add more info about stack


## Running in Production

### Option 1 - Docker (Recommended)

You can run this application using docker:

```
docker run -p 4000:4000 strandgeek/web3-app:latest
```


### Option 2 - Build the project

1 - Clone this repository

2 - Go to the webapp and build it:

```
cd webapp
npm install
npm run build
```

3 - Go to the api and build it:
```
cd ../api
npm install
npm run build
```

4 - Run the API
```
npm start
```

The server should listen on port 4000 and it already serves the webapp static build.


## Development

To setup the development environment, follow these steps:

1 - Clone this repository

2 - Go to the webapp and start it:

```
cd webapp
npm install
npm start
```

2 - In another terminal, go to the api and start it

```
cd ../api
npm install
npm run dev
```

The application should run on http://localhost:4000. The api will serve the webapp as proxy
