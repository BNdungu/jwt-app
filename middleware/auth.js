const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorisation
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError('Invalid token')
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = username
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorised to acces this route')
    }

   
}

module.exports = authenticationMiddleware