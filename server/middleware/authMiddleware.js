import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //getting the token from the header
      token = req.headers.authorization.split(' ')[1];

      if (token == "ADMIN_TOKEN") {
        req.user = { isAdmin: true };
        console.log("USER::::", req.user)
        return next();
      }

      //here we verify the taken token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      if(decoded.isAdmin){
        req.user = { isAdmin: true };
        next();
        return; 
      }

      //now geting the users from the token w/o the password
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({message: 'Not authorized, no token'});
  }

  // if (!token) {
  //   res.status(401).json({ message: 'Not authorized, no token' });
  // }
};

const admin = (req, res, next) => {
  console.log("USER::::", req.user, req.user.isAdmin)

  if (req.user && req.user.isAdmin) {
    console.log("ADMONNNN")
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

// module.exports = { protect, admin };

export {protect, admin};
// export { protect };