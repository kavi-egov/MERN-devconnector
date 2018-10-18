const express = require('express');
const mongoClient = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


// requiring the apis from the controller package
const userController = require('./web/controller/UserController');
const profileController = require('./web/controller/ProfileController');
const postController = require('./web/controller/PostController');

const app = express();

/**
 *body parser config for rest apis
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 
 * mongo configs
 */
const dbUrl = require('./resources/keys.jsx').dbUrl;

mongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then(() => console.log(" successfully connected to db"))
    .catch((err) => console.log(` the err is : ${err}`));

/**
 * passport config for jwt auth 
 */
app.use(passport.initialize());

require('./config/passport')(passport);

// home page for express
app.get("/", (req, res) => res.send('hello!'));

// setting routing path for the controllers
app.use("/devconnector/user", userController);
app.use("/devconnector/profile", profileController);
app.use("/devconnector/post", postController);

// server port for local and heroku
const port = process.env.PORT || 5000;

// configuring port and log message
app.listen(port, () => console.log(` the app is running in ${port}`));


