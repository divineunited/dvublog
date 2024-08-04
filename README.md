# United Blogosphere
A blog safe space for everyone.


# Useful Commands:

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

# Dependencies: 
npx create-next-app@latest dvu-blog --typescript
npm install axios 
npm install mongoose