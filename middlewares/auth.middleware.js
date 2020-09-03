const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const error = require('../models/error.model');

dotenv.config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
          throw error[1010];
        } else {
          next();
        }
      });
    } else {
      throw error[1010]
    }
  } catch (err) {
    res.status(403).json({
      error: true,
      ...err
    })
  }
};

module.exports = {
  requireAuth
};
