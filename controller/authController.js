const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');

//middelware for checking user is login or not
exports.protect = async (req, res, next) => {
  try {
    let token;
    //check token is available in header or cookie if available the put in token variable
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    //if token not available then send error
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Login into app to access the content',
      });
    }

    //decoede and verify the jwt token and find id
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    //pass the user details to next middelware or handler
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Login into app to access the content',
      });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: 'fail',
      message: 'Login into app to access the content',
    });
  }
};

//check user role to route protection
exports.accessTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'you are not authorize to that route',
      });
    }

    next();
  };
};
