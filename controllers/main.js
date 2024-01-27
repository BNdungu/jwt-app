const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req,res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new BadRequestError('Please provide login details')
    }
    
    const id = new Date().getMonth()
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn: '30d'})

    res.status(200).json({msg: 'user created', date: id, token})
}

const dashboard = async (req,res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg : `Hello ${req.user}`, secret: `Here is you secret message ${luckyNumber}`})
}


module.exports = {
    login,
    dashboard
}