# Reactjs front-end

**Follow these steps to setup this front-end application**

**1. Clone repository in your locale system by this command**

https://github.com/shakoorfarhan/fullstack-development.git

**2. Go to App.js and EditUser.js files and replace the url in fetch request with your own server url as follows**

To fetch users from symfony back-end by this fetch request **fetch("http://127.0.0.1:8001/api/users")**, all you need to do is to replace url http://127.0.0.1:8001 with your own 
server url you get in last step mentioned in readme.md file of branch **symfony-back-end-application**. Repeat this for all fetch requests.

**3. Start react application** 

Now start react application with command **npm start**. All pages and links will work as expected, the loading can take few seconds due to async calls and the time depends upon your internet speed.

**Note: After editing user you'll be redirected back to home page ('/' path) and you won't see updated changes in the list. So in order to sync these changes press button  'refresh users'**
