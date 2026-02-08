import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
         console.log(process.env.JWT_SECRET);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
