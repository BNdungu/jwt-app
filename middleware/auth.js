const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorisation
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        throw new CustomApiError('Invalid token', 401)
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = username
        next()
    } catch (error) {
        throw new CustomApiError('Not authorised to acces this route', 401)
    }

   
}

module.exports = authenticationMiddleware