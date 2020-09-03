const error = require('../models/error.model');
const User = require('../models/user.model');

const validateDuplicateEmail = async (email) => {
  const emailExists = await User.findOne({ email })

  return emailExists ? true : false;
}

const validateEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

const validateName = (name) => {
  return /^[a-zA-Z]+$/.test(name);
}

const validatePassword = (password) => {
  if (password.length < 6) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!/\W/.test(password)) {
    return false;
  }

  return true;
};

const validateRegister = (req, res, next) => {
  const { email, name, password } = req.body;
  const errorObject = { code: [], message: [] };

  if (!validateEmail(email)) {
    errorObject.code.push(error[1001].code);
    errorObject.message.push(error[1001].message);
  }

  if (!validateName(name)) {
    errorObject.code.push(error[1002].code);
    errorObject.message.push(error[1002].message);
  }

  if (!validatePassword(password)) {
    errorObject.code.push(error[1003].code);
    errorObject.message.push(error[1003].message);
  }

  if (!validateDuplicateEmail(email)) {
    errorObject.code.push(error[1006].code);
    errorObject.message.push(error[1006].message);
  }

  try {
    if (errorObject.code.length > 0 && errorObject.message.length > 0) {
      throw errorObject;
    }

    next();
  } catch (err) {
    res.status(400).json({
      error: true,
      ...err
    });
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errorObject = { code: [], message: [] };

  if (!validateEmail(email)) {
    errorObject.code.push(error[1001].code);
    errorObject.message.push(error[1001].message);
  }

  if (!validatePassword(password)) {
    errorObject.code.push(error[1003].code);
    errorObject.message.push(error[1003].message);
  }

  try {
    if (errorObject.code.length > 0 && errorObject.message.length > 0) {
      throw errorObject;
    }

    next();
  } catch (err) {
    res.status(400).json({
      error: true,
      ...err
    });
  }
}

module.exports = {
  validateRegister,
  validateLogin
};
