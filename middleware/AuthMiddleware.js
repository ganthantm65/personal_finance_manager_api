import jwt from 'jsonwebtoken';
const jwt_secret=process.env.JWT_SECRET;

export default authMiddleware=(req,res,next)=>{
    const token=req.header('Authorization')?.replace('Bearer ','');
    if(!token){
        return res.status(401).json({message:'Token not provided'});
    }
    try{
        const decoded=jwt.verify(token,jwt_secret);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({message:'Invalid token'});
    } 
}