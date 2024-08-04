# dvublog
Building and hosting and writing my blog


# Useful Commands:
Within: ./dvu-blog

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm start
    Runs the built app in production mode.

Remove node_modules and rebuild dependencies:
`rm -rf node_modules package-lock.json`
Then: `npm install`


# Dependencies: 
-- (all handled in package.json)
npx create-next-app@latest dvu-blog --typescript
npm install axios 

mongoDB :
npm install mongoose

connection string local env:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdbname?retryWrites=true&w=majority  
