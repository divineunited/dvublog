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
within your .env.local, add:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority  

Query it locally:
Install it via: 
`brew tap mongodb/brew`
`brew update`
`brew install mongodb-community@7.0`

--- Current Error due to Abseil for my work stuff: --- 
Error: Could not symlink lib/cmake/absl/abslConfig.cmake
Target /opt/homebrew/lib/cmake/absl/abslConfig.cmake
is a symlink belonging to abseil@20230802.1. You can unlink it:
  brew unlink abseil@20230802.1

To force the link and overwrite all conflicting files:
  brew link --overwrite abseil@20230802.1

To list all files that would be deleted:
  brew link --overwrite abseil@20230802.1 --dry-run

--- Get my other laptop and switch work over to there --- then continue

Start it by running: `brew services start mongodb-community@7.0`
Stop it by running: `brew services stop mongodb-community@7.0`

Start it by running `mongod` in your terminal. The default port is 27017. 
You can create a database using the MongoDB shell (mongo). For example:

```
mongo  
use mydatabase
```

The connection string for a local MongoDB instance is usually something like:
mongodb://localhost:27017/mydatabase 

THEN:
1. Update Your Mongoose Connection Code in .env.local ~ MONGODB_URI=fakemongodbstring

2 Testing the Connection:
You can create a simple API route in your Next.js application to test the connection. For example, create a file named testConnection.ts in the pages/api directory:
```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/connectToDatabase';
export default async (req: NextApiRequest, res: NextApiResponse) => {  
  try {  
    const db = await connectToDatabase();  
    res.status(200).json({ message: "Connected to the database successfully!" });  
  } catch (error) {  
    res.status(500).json({ message: "Error connecting to the database", error });  
  }  
};  
```  

Now, if you run your Next.js application (`npm run dev`) and visit `http://localhost:3000/api/testConnection`, you should see a message indicating whether the connection was successful.  



# Dependencies: 
npx create-next-app@latest dvu-blog --typescript
npm install axios 
npm install mongoose