const jwtStrategy = require('passport-jwt').Strategy;

const extractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');

const userModel = mongoose.model('user');

const secretkey = require('../resources/keys.jsx').secretKey;


const opts = {};

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretkey;

module.exports = passport => {

    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {

        userModel.findById(jwt_payload.id).then(user => {
            if (user)
                return done(null, user);
            else
             return done(null, false);
        }).catch(err => {
            return done(err);
        });
    }));
};
