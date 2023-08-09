const jwt = require('jsonwebtoken');
const Users = require('../Model/Users/userSchema');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    const rootUser = await Users.findOne({ _id: verifyToken._id, 'tokens.token': token });

    if (!rootUser) {
      throw new Error('User not found') ;
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();

  } catch (err) {
    res.status(401).send('Unauthorized:No Token provided')
    console.log(err);
  }
};

module.exports = authenticate;
