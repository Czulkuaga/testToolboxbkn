const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/globalData')

function verify(req,res,next){
    const accessToken = req.headers.authorization
    const token = accessToken.split(' ')[1];
    //console.log(token)
    if(token){
        jwt.verify(token, SECRET_KEY, (err,user)=>{
            if(err) res.status(403).json({error:401, message:'El token no es válido'})
            req.user = user
            next()
        })
    }else{
        return res.status(401).json({error:401,message:'No estas authenticado'})
    }
    
}

module.exports = verify