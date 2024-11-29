# CIS 440 Team # Final Project

Recipe Finder App
A simple recipe recommendation application that allows users to search for recipes based on their interests. The app uses the Spoonacular API to fetch recipe data and provides an intuitive interface for users to explore and view detailed recipe information.

Table of Contents
Features
Demo
Technologies Used
Prerequisites
Installation
1. Clone the Repository
2. Set Up the Backend
3. Set Up the Frontend
Usage
Troubleshooting
Contributing
License
Acknowledgements
Contact
Additional Information
FAQ
Features
Recipe Search: Users can search for recipes by entering keywords or ingredients.
Recipe Details: View detailed information about each recipe, including ingredients and instructions.
Responsive Design: The app is responsive and works on various screen sizes.
API Integration: Utilizes the Spoonacular API for rich recipe data.


Technologies Used
Frontend:

React.js
Axios
React Router DOM
Backend:

Node.js
Express.js
Axios
Dotenv (for environment variables)
Cors
API:

Spoonacular API
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm installed.

Windows:

Download the Windows installer from Node.js official website.
Run the installer, follow the prompts, and install Node.js and npm.
Mac:

Download the macOS installer from Node.js official website.

Alternatively, you can use Homebrew:

bash
Copy code
brew install node
Git installed for cloning the repository (optional if you download the ZIP).

Windows:

Download and install Git from Git for Windows.
Mac:

Git is typically installed on macOS. If not, install it via Xcode Command Line Tools:

bash
Copy code
xcode-select --install
A Spoonacular API Key. Sign up at Spoonacular API to get your free API key.

Installation
Follow these steps to set up the project on your local machine.

1. Clone the Repository
Option 1: Using Git

Windows Command Prompt or PowerShell:

bash
Copy code
git clone https://github.com/yourusername/--yourappname--.git
cd --yourappname--
Mac Terminal:

bash
Copy code
git clone https://github.com/yourusername/--yourappname--.git
cd --yourappname--
Option 2: Download ZIP

Download the repository as a ZIP file from GitHub.

Extract the ZIP file to a directory of your choice.

Open a terminal window and navigate to the extracted directory:

Windows Command Prompt or PowerShell:

bash
Copy code
cd path\to\--yourappname--
Mac Terminal:

bash
Copy code
cd path/to/--yourappname--
2. Set Up the Backend
Navigate to the Backend Directory
bash
Copy code
cd backend
Install Backend Dependencies
bash
Copy code
npm install
Configure Environment Variables
Create a .env file in the backend directory.

Windows Command Prompt:

cmd
Copy code
type NUL > .env
Windows PowerShell:

powershell
Copy code
New-Item -Path . -Name '.env' -ItemType "file"
Mac/Linux Terminal:

bash
Copy code
touch .env
Add your Spoonacular API key to the .env file:

Open the .env file in a text editor.

Add the following line:

dotenv
Copy code
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
Important: Replace your_spoonacular_api_key_here with your actual API key. Do not share this key publicly or commit it to version control.

Start the Backend Server
Start the server using one of the following commands:

Using Node:

bash
Copy code
npm start
Using Nodemon (if installed):

bash
Copy code
npm run dev
Note: If you haven't installed nodemon globally and you want to use it, install it with:

bash
Copy code
npm install -g nodemon
You should see:

arduino
Copy code
Server running on port 5001
Verify Backend Server is Running
Open your web browser and navigate to:

bash
Copy code
http://localhost:5001/api/search?query=test
You should receive a JSON response (an empty array or some test data).

3. Set Up the Frontend
Navigate to the Frontend Directory
Open a new terminal window (keep the backend server running) and navigate to the frontend directory:

Windows Command Prompt or PowerShell:

bash
Copy code
cd path\to\--yourappname--\frontend
Mac Terminal:

bash
Copy code
cd path/to/--yourappname--/frontend
Install Frontend Dependencies
bash
Copy code
npm install
Configure Proxy (Optional)
If you need to configure the proxy, ensure the proxy field in frontend/package.json points to your backend server:

Open frontend/package.json in a text editor.

Add or verify the following:

json
Copy code
"proxy": "http://localhost:5001",
Start the Frontend Development Server
bash
Copy code
npm start
This will start the React development server and open the app in your default web browser at http://localhost:3000.

If it doesn't open automatically, you can open your browser and navigate to http://localhost:3000.

Usage
Once both servers are running, you can use the application:

Access the App

Open your web browser and navigate to http://localhost:3000.

Search for Recipes

Enter a keyword or ingredient in the search bar (e.g., "pasta", "chicken", "vegan").
Click the Find Recipes button or press Enter.
View Recipe Results

A list of recipes matching your query will appear.
Each recipe displays a title and an image.
View Recipe Details

Click on a recipe title or image to view detailed information.
The recipe detail page includes ingredients and instructions.
Navigate Back

Use the ← Back to Search link to return to the search results.
Troubleshooting
If you encounter issues, consider the following:

Backend Server Issues
Server Not Starting

Ensure you have installed all dependencies: npm install.
Check that your .env file contains your Spoonacular API key.
Verify that no other process is using port 5001. If it is, change the port in server.js and update the proxy in frontend/package.json.
API Errors

Invalid API Key: Ensure your API key is correct and active.
API Rate Limit Exceeded: The free plan has a daily limit. Wait until it resets or upgrade your plan.
Frontend Application Issues
App Not Loading

Ensure you have installed all dependencies: npm install.
Check for errors in the terminal where you ran npm start.
Verify that the backend server is running.
CORS Errors

Ensure the proxy is correctly set in package.json.
Make sure the backend server allows CORS (which it does by default in this setup).
Common Errors and Solutions
Port Already in Use

Error Message: EADDRINUSE: address already in use :::5001
Solution:
Windows:
Open Command Prompt as Administrator.
Run netstat -ano | findstr :5001 to find the process ID (PID).
Terminate the process using taskkill /PID <PID> /F.
Mac/Linux:
Run lsof -i :5001 to find the PID.
Terminate the process using kill -9 <PID>.
Failed to Compile

Solution: Check the error message in the terminal and fix any syntax errors in your code.
Network Error or 500 Internal Server Error

Solution: Ensure the backend server is running and accessible. Check the backend terminal for error messages.
Contributing
Contributions are welcome! Please follow these steps:

Fork the Repository

Create a Feature Branch

bash
Copy code
git checkout -b feature/YourFeature
Commit Your Changes

bash
Copy code
git commit -m "Add YourFeature"
Push to the Branch

bash
Copy code
git push origin feature/YourFeature
Open a Pull Request

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Spoonacular API for providing recipe data.
Create React App for bootstrapping the frontend application.
Express.js for the backend framework.
Contact
If you have any questions or suggestions, feel free to open an issue or contact the project maintainer at mdigiuse@asu.edu.

Additional Information
Project Structure
java
Copy code
--yourappname--/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.js
│   │   │   ├── RecipeList.js
│   │   │   └── RecipeDetail.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
├── README.md
└── LICENSE
Environment Variables
Backend .env File:

dotenv
Copy code
SPOONACULAR_API_KEY=your_spoonacular_api_key_here
Backend API Endpoints
Search Recipes:

graphql
Copy code
GET /api/search?query={query}
Get Recipe Details:

bash
Copy code
GET /api/recipe/{id}
Scripts
Backend:

Start Server:

bash
Copy code
npm start
Start Server with Nodemon (Development):

bash
Copy code
npm run dev
Frontend:

Start Development Server:

bash
Copy code
npm start
Build for Production:

bash
Copy code
npm run build
FAQ
1. Can I use this project commercially?
Yes, this project is licensed under the MIT License, which allows for commercial use.

2. How can I deploy this application?
You can deploy the frontend and backend separately:

Backend: Deploy to services like Heroku, Render, or AWS Elastic Beanstalk.
Frontend: Deploy to services like Netlify, Vercel, or GitHub Pages.
Ensure to update the API endpoints and proxy settings accordingly.

3. I get an error about exceeding the API quota. What should I do?
The Spoonacular API free plan has daily request limits. You can:

Wait until the quota resets (usually after 24 hours).
Upgrade to a paid plan for higher limits.
Implement caching to reduce API calls.
4. I receive a CORS error when making API calls. How can I fix this?
If you're not using the proxy setup, ensure that the backend server has CORS enabled. In server.js, make sure you have:

javascript
Copy code
const cors = require('cors');
app.use(cors());
Alternatively, use the proxy setup as described in the Installation section.

Thank you for using the Recipe Finder App!

