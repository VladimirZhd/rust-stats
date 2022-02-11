# Overview

This is the a statistics website for the `Rust` game. To start the server on a local machine you need to instal `fastapi`, `uvicorn`, and `requests` libraries. Then go to the `python` folder and run `python3 -m uvicorn main:app` on mac, and `python -m uvicorn main:app`. To start the frontend you need to run `npm start` in the root folder. Open `http://localhost:3000` in the browser and run use the app.

I wanted to build that software because I am playing that game and wanted to see the stats, the way I want to see them. Also, I play with friends and we can see who does a better job harvesting resources and building bases.

[Software Demo Video](https://youtu.be/b5hhTd354Ms)

# Web Pages

The application starts with landing page where a user can search for his/her stats using their steam id. After submitting the search request, it takes them to the stats page. Where all of the stats build dynamically. Also, the website has registration, login, and profile page. The first two just a regular form pages. The profile page will have links to logged in user stats and to all steam account that user saves to the favorites.

# Development Environment

I've used `SteamAPI` to get the data, because I could't use it directly from frontend (CORS). I've set up a proxy server using `Python` framework `FastAPI`. Because `FastAPI` has built in swagger docs, I was able to use my browser and running server to test the backend. I make calls to the API and format the data to it's final state and send it to the frontend. On the frontend I've used `React` and `Firebase`. All of the coding was done in `Visual Studio Code`.

# Useful Websites

-   [FastAPI](https://fastapi.tiangolo.com/)
-   [SteamAPI](https://steamcommunity.com/dev)
-   [Game Icons](https://game-icons.net/)
-   [HeroIcons](https://heroicons.com/)

# Future Work

There is still a lot work to do for me to get satisfied by this software.

-   Fix all bugs related to hard page reload.
-   Finish profile page, to display favorites.
-   Add styles for mobile view
-   Add an external link to player's steam account
-   Clean up the code, dividing stats component into three different components.
