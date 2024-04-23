const jwt = require('jsonwebtoken')
const createError = require('./error')

const verifytoken = (req,res,next) =>{
    const token = req.cookies.access_token

    if(!token){
        return next(createError(404,"You are not authenticated!"))
    }

    jwt.verify(token,process.env.key,(error,user)=>{
        if(error) return next(createError(400,"Invalid access token!"))
        req.user = user
        next()
    })

}

const verifyUser = (req,res,next) =>{
        verifytoken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"you are not authorised!"))
        }
    })

   
}

const isAdmin = (req,res,next) =>{
        verifytoken(req,res,  () =>{
         if( req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"you are not admin!"))
        }
    })

   
}

exports.verifytoken = verifytoken
exports.verifyUser  = verifyUser 
exports.isAdmin  = isAdmin 