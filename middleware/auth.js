const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: 'Authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;

    next();

    //
  } catch (error) {
    return res.status(400).json({ success: false, msg: 'Token is not valid' });
  }
};

module.exports = auth;
