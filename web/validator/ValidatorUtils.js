const utils = {

    isEmptyCustom : obj => 
        (
        
            obj === undefined || 
            
            obj === null || 
            
            (typeof obj === 'string' && obj.trim().length === 0) ||

            (typeof obj === 'object' && Object.keys(obj).length === 0)

    )
};

module.exports = utils;