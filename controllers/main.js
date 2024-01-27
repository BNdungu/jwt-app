const CustomApiError = require('../errors/custom-error')

const login = async (req,res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new CustomApiError('Please provide login details', 400)
    }

    res.send('Fake login/register route')
}

const dashboard = async (req,res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg : 'Hello John doe', secret: `Here is you secret message ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}