const validator = require('validator');
const isEmptyCustom = require('./ValidatorUtils').isEmptyCustom;

module.exports = (data, isLogin) => {

    const errs = {};
    
    if (!isLogin)
        if (!isEmptyCustom(data.name)) {
            if (!validator.isLength(data.name, { min: 2, max: 30 }))
                errs.name = `The value for name should be 2 to 30`;
        } else errs.name = ` name field cannot be empty`;

    
    if (!isEmptyCustom(data.email)) {
        if (!isLogin && !validator.isEmail(data.email))
            errs.email = `The value for email should be in proper format. eg- abc@gmail.com`;
    } else errs.email = ` email is mandatory`;

    
    if (!isEmptyCustom(data.password)) {
        if (!isLogin && !validator.isLength(data.password, { min: 2, max: 30 }))
            errs.password = `The value for password should be 2 to 30`;
    } else errs.password = ` password field cannot be empty`;    
    
    return {errs, isValid: isEmptyCustom(errs)};
};