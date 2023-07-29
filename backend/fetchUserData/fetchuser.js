const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const JWT_SECRET  = process.env.JWT_SECRET;
const fetchuser=(req, res, next)=>{

    const token= req.header("auth-token");//created an auth-token and verifying it
    if(!token)
    {
        return res.status(401).send({error:"Please login with valid token"});
    }
    try {
        let data= jwt.verify(token, JWT_SECRET);
        req.user= data.user;   // if verify then, in  req.user the verified user data will be stored and shows
        next();      
    } catch (error) {
        res.status(401).send({error:"access Denied"})
    }

}
module.exports=fetchuser;