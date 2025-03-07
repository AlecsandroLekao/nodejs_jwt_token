import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  
  const token = req.headers.authorization;
    
  if (!token) {
    return res.status(401).json({
      message: "Token nao informado",
    });
  }
  console.log('TOKEN '+ JWT_SECRET)
  try {
    //console.log(authorization.replace('Bearer ','')) 
    const decoded = jwt.verify(token.replace('Bearer ',''), JWT_SECRET);
         console.log(decoded)
  } catch (error) {
    return res.status(401).json({
      message: 'Token invalido',
    });
  }

  next();
};

export default auth;
