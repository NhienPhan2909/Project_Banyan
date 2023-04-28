# AI-PM

A Generative AI Powered Project Planning and Management tool 

### Architecture
#### Client
The client is designed as React application. 
The src/ directory consists of 2 main sub-directories: components and pages. It also includes App.js and index.js that renders all the components and pages 
- components: React components
- pages: The pages for the React app which include
    - auth: Authentication of users
    - Dashboard: Landing dashboard showing existing projects after successful authentication
    - Onboard: Landing page of the app
    - prompt: Page where user enters the prompt for new project to work on
    - tree: Tree Visualization page of the project breakdown based on the user entered prompt

#### Server
The server has the Model-Routes-Controller design. 
THere are 4 main controllers:
1. AuthController - Handle the authentication & verification of the new/registered users
2. ChatGptController - Manage API calls to Generative AI model by OpenAI
3. NodeController - Manage the add, delete, find and update functionalities for node in the database
4. ProjectController - Manage the add, delete, find, getAll and update for multiple projects in the database

### Start Project
#### Start the server
```
cd /server
npm install
node server.js
```

#### Start the Client
```
cd client
npm install
npm start
```

