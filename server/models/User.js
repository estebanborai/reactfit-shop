const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  avatar: String,
  birthday: Date,
  hash: String,
  salt: String
});

UserSchema.methods.checkPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.toJSON = function() {
  let userObj = this.toObject();
  delete userObj.hash;
  delete userObj.salt;
  return userObj;
}

module.exports = mongoose.model('User', UserSchema);