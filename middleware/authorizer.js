const {decoder} = require('../helper/helper')
module.exports.authorizer = (req, res, next) => {
    decoder()
    next()
};
