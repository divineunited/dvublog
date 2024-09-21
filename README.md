# United Blogosphere
A blog safe space for everyone.


# Useful Commands:

First ensure you have node and npm installed (node -v / npm -v to check):
https://nodejs.org/en/download/package-manager

npm run dev
    Starts the development server.

npm run build
    Builds the app for production.

npm start
    Runs the built app in production mode.

Remove node_modules and rebuild dependencies:
rm -rf node_modules package-lock.json
npm install

# Connecting to the Mongo DB
Install it first via: 
`brew tap mongodb/brew`
`brew update`
`brew install mongodb-community@7.0`

Then to test locally:
brew services start mongodb/brew/mongodb-community

This command will start MongoDB as a background service. If you prefer to run it in the foreground for easier monitoring, you can use:
mongod --config /opt/homebrew/etc/mongod.conf

Once running, access the shell: `mongosh`

Create a test database: `use testDB`
db.testCollection.insertOne({ name: "John Doe", age: 30 })
db.testCollection.find({ name: "John Doe" })

Once done, stop the server:
brew services stop mongodb/brew/mongodb-community


### Accessing MongoDB from your Code
within your .env.local, add:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority  

Update Your Mongoose Connection Code in .env.local for local testing: MONGODB_URI=mongodb://localhost:27017/posts
Test to make sure the connection is good and have your dev environment running and visit: http://localhost:3000/api/testConnection


# Creating Posts using Curl

To test POST requests to the /api/posts endpoint:
```
curl -X POST http://localhost:3000/api/posts \
-H "Content-Type: application/json" \
-d '{
  "title": "Test Post",
  "content": "This is a test post.",
  "summary": "This is the summary of the test post."
}'
```

Ensure they exist by querying the DB:
```
mongosh
use posts
db.posts.find().pretty()
```


# Dependencies: 
npx create-next-app@latest dvu-blog --typescript
npm install axios 
npm install mongoose
npm install mongodb
npm install formik yup
npm install multer
npm i uuid


# Env Variables Needed:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority  
JWT_SECRET=your_secret_key_here