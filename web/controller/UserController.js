const userModel = require('../../model/User');
const secretKey =  require('../../resources/keys.jsx').secretKey;
const UserValidator = require('../validator/UserValidator');

const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');


const router = express.Router();


/**
 * test api to check status of controller
 */
router.get('/getusers', (req, res) => {

    userModel.find().then( users => {
        users.map( user => user.password = undefined);
        res.json(users)}).catch(err => res.status(400).json({err : "no data found"}));
});

/**
 * create new user if not exists else throw duplicate user error
 */
router.post('/register', (req, res) => {

    const err = UserValidator(req.body, false);

    if (!err.isValid) {
        res.status(400).json(err.errs);
        return;
    }

userModel.findOne({email: req.body.email}).then(user => {
    if(user)
    res.status(400).json({error : `user already exists for the email ${req.body.email}` });
    else{

        const newAvatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        bcryptjs.genSalt(10, (err, salt) => {
            
            bcryptjs.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;

                new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: newAvatar,
                    password: hash
                }
                ).save()
                    .then(user => res.status(201).json(user))
                    .catch(err => res.status(500).json(err));
        
            })
        });

    }
    
}).catch(
     err => res.status(500)
     .json({ error : ` error occured while fetching data from db : ${err}`}));
});

/**
 * userlogin 
 */
router.post('/login', (req, res) => {

    const err = UserValidator(req.body, true);

    if (!err.isValid) {
        res.status(400).json(err.errs);
        return;
    }

    userModel.findOne({ email: req.body.email }).
        then(user => {
            if (user) {

                if (bcryptjs.compare(req.body.password, user.password, (err, success) => {

                    if (success) {
                        const load = { name: user.name, id: user.id };
                        jwt.sign(load, secretKey, { expiresIn: 3600 * 48 }, (err, token) => {
                            if (token)
                                res.json({ "response": "success", "token": `Bearer ${token}`});
                            else res.status(500).json({ "response": `error occured while fetching token : ${err}` });
                        });
                    } else res.status(400).json({ "response": "failed", "password": `Invalid password ` });
                }));
            }
            else res.status(400).json({ "response": "no users found" });
        }).catch(err => res.status(500).json({ "response": `error occured while fetching data : ${err}` }));
});

/**
 * 
 */
router.post('/getloggeduser', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {name, email, avatar} = req.user; 
    res.send({name, avatar});
});
 

module.exports = router;