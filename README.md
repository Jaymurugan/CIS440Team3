# CIS 440 Team 3 Final Project

## Recipe Finder App
### A simple recipe recommendation application that allows users to search for recipes based on their interests. The app uses the Spoonacular API to fetch recipe data and provides an intuitive interface for users to explore and view detailed recipe information.

This is basically Mathew's branch but I changed the sql connection to sqlite because it is easier to use. 

# Instructions
- Go to the backend directory in terminal, run **npm install** then **npm install sqlite3** and then **npm start**
- Open another terminal **Do not close the first one** navigate to the frontend directory and run **npm install** then **npm start**.
- It should launch the app on port 3000 if not paste this into your browser **http://localhost:3000**

Some things to note about react
- There are two servers one is the backend node api and it runs on port 5001 and a front end server that runs on port 3000.
- If one of ther servers is not up it wil not work.