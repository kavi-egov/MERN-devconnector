const validator = require("validator");
const isEmptyCustom = require("./ValidatorUtils").isEmptyCustom;

module.exports = profile => {
    const error = {};

    if (isEmptyCustom(profile)) {

        error.profile = "The profile object is mandatory";
    } 
    else {

        console.log(profile);
        
        if (isEmptyCustom(profile.status)) 
            error.profilestatus = `status field is mandatory`;

        if (isEmptyCustom(profile.handle)) 
            error.profilehandle = `handle field is mandatory`;
    }

    if (!isEmptyCustom(error)) return error;
};
