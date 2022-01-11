const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'minimun 3 characters'],
    maxlength: [40, 'maximum 40 characters required'],
    required: true,
  },
  password: {
    type: String,
    minlength: [5, 'minimum 5 characters'],
    maxlength: [30, 'maximum 30 characters'],
    required: [true, 'password is a required field'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: [5, 'minimum 5 characters'],
    maxlength: [30, 'maximum 30 characters'],
    required: [true, 'password confirm is required fields'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'confirmPassword must be same as password',
    },
    select: false,
  },
  email: {
    type: String,
    minlength: [4, 'email is invalid'],
    trim: true,
    lowercase: true,
    required: [true, 'email is a required field'],
    unique: [true, 'this email already exist in our database'],
  },
  role: {
    type: String,
    enum: {
      values: ['employee', 'mentor', 'admin'],
      message: 'role is user or admin',
    },
    default: 'employee',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//mongoose middelware for encrypting the password
userSchema.pre('save', async function (next) {
  //check if password is changed
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
  //password confirm field to make undefiend
  this.passwordConfirm = undefined;

  next();
});

//password decrypting and checking method
userSchema.methods.checkPassword = async function (
  enterdPassword,
  dbUserPassword
) {
  return await bcrypt.compare(enterdPassword, dbUserPassword);
};

//create password reset token
userSchema.methods.createPassResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

//creating user model
const User = mongoose.model('User', userSchema);

module.exports = User;
