const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const error = require('./error.model');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw error[1004];
  }
  throw error[1007];
};

userSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret['password'];
      return ret;
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
