const express = require('express');

const mongoClient = require('mongoose');

// requiring the apis from the controller package
const userController = require('./web/controller/UserController');
const profileController = require('./web/controller/ProfileController');
const postController = require('./web/controller/PostController');

const app = express();

const dbUrl = require('./resources/keys.jsx').dbUrl;

mongoClient.connect(dbUrl)
.then( () => console.log(" successfully connected to db"))
 .catch( (err) => console.log(` the err is : ${err}`));
   


app.get("/", (req, res) => res.send('hello!'));

// setting routing path for the controllers
app.use("/devconnector/user", userController);
app.use("/devconnector/profile", profileController);
app.use("/devconnector/post", postController);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(` the app is running in ${port}`));


