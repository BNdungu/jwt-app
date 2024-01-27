const jwt = require('jsonwebtoken')
const CustomApiError = require('../errors/custom-error')

const login = async (req,res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new CustomApiError('Please provide login details', 400)
    }
    
    const id = new Date().getMonth()
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn: '30d'})

    res.status(200).json({msg: 'user created', date: id, token})
}

const dashboard = async (req,res) => {
    const authHeader = req.headers.authorisation
    const luckyNumber = Math.floor(Math.random()*100)
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        throw new CustomApiError('Invalid token', 401)
    }
    const token = authHeader.split(' ')[1]
    

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({msg : `Hello ${decoded.username}`, secret: `Here is you secret message ${luckyNumber}`})
    } catch (error) {
        throw new CustomApiError('Not authorised to acces this route', 401)
    }

    
}

module.exports = {
    login,
    dashboard
}