const jwt = require("jsonwebtoken");
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async(req,res,next)=>{
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token){
        return res.status(404).json({error:"Token not found"})
    }
    jwt.verify(token,JWT_SECRET,(err,message)=>{
        if(err){
            console.log(err)
            return res.status(403).json({ message: 'Session Expired' });
        }
        next()
    })
}

module.exports  = verifyToken;