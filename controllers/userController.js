const error = require('../models/error.model');
const success = require('../models/success.model');
const User = require('../models/user.model');

const getUsers = async (req, res) => {
  const users = await User.find({});

  try {
    if (users.length < 1) {
      throw error[1009];
    }

    res.status(200).json({
      error: false,
      ...success[1004],
      users
    });

  } catch (err) {
    res.status(400).json({
      error: true,
      ...err
    });
  }
}

const getUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  try {
    if (!user) {
      throw error[1008];
    }

    res.status(200).json({
      error: false,
      ...success[1003],
      user
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      ...err
    });
  }
};

module.exports = {
  getUser,
  getUsers
}
