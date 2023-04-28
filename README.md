# AI-PM

A Generative AI Powered Project Planning and Management tool 

### Architecture
#### Client

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

