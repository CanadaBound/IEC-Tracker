const jwt = require('jsonwebtoken');
const secret = 'ThisIsSuchASecret';

//This is our authentication middleware, it checks if theres a cookie and if there is, we use JWT to check that the
//token issued is valid. If it is, it passes and the user can access the data otherwise it throws an error.
const withAuth = function(req, res, next) {
  const token = req.cookies.token;  
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
}
module.exports = withAuth;