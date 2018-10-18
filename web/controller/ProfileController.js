const mongoose = require('mongoose');
const passport = require('passport');

const express = require('express');
const router = express.Router();

const Profile = require('../../model/Profile');
const User = require('../../model/User');
const profileValidator = require('../validator/ProfileValidator');

/**
 * router to get profile by handle search
 */
router.get('/handle/:handle', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar'])
        .then(searchresult => {
            if (searchresult) 
                return res.json(searchresult);
            else 
                return res.status(404).json({ error: `no prfoile not found for given handle` });
        })
        .catch(err => res.json(err));
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const user = req.user;

    Profile.findOne({user : user.id}).then( profile => {
        if(profile)
            res.json(profile);
        else
            res.status(404).json({"PROFILE_NOT_FOUND" : "No profile has been found for the user"});

    }).catch( err => {
        res.status(500).json({"SERVER_ERROR" : ` error occured while fetching profile : ${err}`})
    })
});

router.post('/_create', passport.authenticate('jwt', {session: false}), (req, res) => {

    const user = req.user;
    const profile = req.body.profile;
    profile.user = user.id;

    const err = profileValidator(profile);

    if(err) return res.status(400).json(err);

    Profile.findOne({ user: user.id }).then(profileById => {

        if (profileById)
            return res.status(400).json({ "error": `profile already exists for the given user`, "profile" : profileById });
        else {

            Profile.findOne({ handle: profile.handle }).then(profileByHandle => {
                if (profileByHandle)
                    return res.status(400).json({ "error": `profile already exists for the given handle name, please provide another name`});
                else
                    new Profile({ ...profile }).save().then( newProfile => {
                        res.json(newProfile);
                    }).catch(err => res.status(500).json(err));
            }).catch(err => res.status(500).json(err));
        }
    }).catch(err => {
        res.status(500).json({ "SERVER_ERROR": ` error occured while fetching profile : ${err}` })
    })

});

router.post('/_update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const user = req.user;
    const profile = req.body.profile;
    profile.user = user.id;

    const err = profileValidator(profile);

    if (err) return res.status(400).json(err);

    Profile.findOne({ user: user.id }).then(profileById => {

        if (profileById) {

            if (profileById.profile === profile.id)
                Profile.update(profile).then(updatedProfile => res.json(updatedProfile))
                    .catch(err => res.status(500).json({ "error": ` error occured while trying to update the profile` }));
            else {
                Profile.findOne({ handle: profile.handle })
                    .then(profileByHandle => {

                        if (profileByHandle)
                            res.status(400).json({ "error": ` another profile already exists for handle : ${profile.hanlde}` })
                        else
                            Profile.update(profile).then(updatedProfile => res.json(updatedProfile))
                                .catch(err => res.status(500).json({ "error": ` error occured while trying to update the profile` }));
                    })
            }
        } else {
            return res.status(400).json({ "error": `profile not found for the given user` });
        }
    }).catch(err => {
        res.status(500).json({ "SERVER_ERROR": ` error occured while fetching profile : ${err}` })
    })
});

router.get("/_list", (req,res) => {

        console.log(` the handle text ${req.query.handle}`);
        
    Profile.find({ handle:{'$regex': req.query.handle}}, { handle: 1, _id: 0 })
    .populate('user',['avatar','name'])
    .then(result => {
        if (result)
            return res.json(result);
        else return res.status(404).json({ err: ` no result found` });
    }).catch(err => res.status(500).json(err));
});



module.exports = router;