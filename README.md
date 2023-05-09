# Disc - Readme

Disc is a music discovery app designed to help you find new music every day, connect with other music enthusiasts, and build communities around your shared musical interests. This repository contains the frontend code for the Discover app, written in React using the `create-react-app` with PWA template.

## Table of Contents

1. [Installation](#installation)
2. [Running the App](#running-the-app)
3. [Dependencies](#dependencies)
4. [Backend Code](#backend-code)
5. [Project Submission & Licensing](#project-submission-and-licensing)

## Installation

To set up the project locally, follow these steps:

1. Unzip the `disc-frontend.zip` file to a desired location.
2. Open a terminal or command prompt and navigate to the unzipped project directory:

```
cd frontend
```

## Running the App

Before running the app, ensure all the required npm modules are installed:

```
npm install
```

To run the app locally in development mode, execute the following command:

```
npm start
```

This will open the app in your default web browser at `http://localhost:3000`.

**Note:** This repository only contains the frontend code for the Discover app. The backend code is not included, as it is hosted on MongoDB Atlas App Services, and we do not want to share code tied to a cloud service.

## Dependencies

This project uses several React libraries, which are listed in the `package.json` file. These libraries are not part of our codebase, and their respective licenses can be found within their documentation.

## Backend Code

Throughout our project, we utilized various APIs such as Spotify, Genius, and YouTube. However, these APIs are used in the backend, which is not included in this repository. The backend is hosted on MongoDB Atlas App Services, which uses a non-SQL, MongoDB database design.

We implemented serverless functions to fetch data from these APIs (Spotify, Genius, YouTube), perform post-processing on user data (adding dates, scheduling triggers like fetching the song of the day at midnight), validate user data to prevent spamming (input validation, rate limiting, etc.).

For more information on MongoDB Atlas and its services, visit their official documentation:
https://docs.atlas.mongodb.com/

## Project Submission and Licensing

This is a project submission for the Discover Music App. The `create-react-app` with PWA template generates some boilerplate code which is included in this project. Apart from the boilerplate code and the dependencies listed in the `package.json` file, all other code in this repository is entirely ours.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
