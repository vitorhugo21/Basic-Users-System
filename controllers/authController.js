const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const success = require('../models/success.model');
const User = require('../models/user.model');

dotenv.config();

const maxAge = 3 * 24 * 60 * 60;
const createJwtToken = (id) => jwt.sign({ id },
  process.env.SECRET_KEY,
  { expiresIn: maxAge });

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  const jwtToken = createJwtToken(newUser._id);

  res.cookie('jwt', jwtToken, {
    httpOnly: true,
    maxAge: maxAge * 1000
  });

  res.status(201).json({
    error: false,
    ...success[1000],
    newUser
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createJwtToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      error: false,
      ...success[1001],
      user
    });
  }
  catch (err) {
    console.log(err);
    res.status(400).json({
      error: true,
      ...err
    });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });

  res.status(200).json({
    error: false,
    ...success[1002]
  })
};

module.exports = {
  register,
  login,
  logout,
};
