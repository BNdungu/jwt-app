
const authenticationMiddleware = (req,res,next) => {
    console.log(req.headers.authorisation);
    next()
}

module.exports = authenticationMiddleware