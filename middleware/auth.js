import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  // Get token from URL
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    req.invalidToken = false;
    next();
  }
  catch (ex) {
    req.invalidToken = true;
    // res.status(400).send('Invalid token.');
    next();
  }
}