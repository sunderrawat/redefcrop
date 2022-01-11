const express = require('express');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const authController = require('./../controller/authController');
const router = express.Router();

const app = express();
const genrateJwt = async function (id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIERS_IN,
  });
  return token;
};

router.post('/signup', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role || 'employee',
    });
    const token = await genrateJwt(user._id);
    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'user not created',
      });
    }
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
      message: 'user created successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'user not created',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'user credientials are incorrect',
      });
    }

    if (user) {
      const passwordCheck = await user.checkPassword(password, user.password);
      user.password = undefined;
      if (!passwordCheck) {
        return res.status(401).json({
          status: 'fail',
          message: 'user credientials are incorrect',
        });
      }
      const token = await genrateJwt(user._id);
      return res.status(200).json({
        status: 'success',
        token,
        message: 'user login success',
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'server error',
    });
  }
});

//only allow these all routes for admin and special
router
  .route('/')
  .get(
    authController.protect,
    authController.accessTo('mentor', 'admin'),
    async (req, res) => {
      try {
        const users = await User.find().select('-__v');
        res.status(200).json({
          status: 'success',
          message: 'all user data',
          users,
        });
      } catch (err) {
        res.status(500).json({
          status: 'fail',
          message: 'something went wrong',
          err,
        });
      }
    }
  )
  .delete(
    authController.protect,
    authController.accessTo('admin'),
    async (req, res) => {
      try {
        await User.deleteMany({});
        res.status(204).json({
          status: 'success',
          message: 'all user deleted',
        });
      } catch (err) {
        res.status(500).json({
          status: 'fail',
          err,
        });
      }
    }
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.accessTo('admin'),
    async (req, res) => {
      try {
        const user = await findById(req.params.id);
        res.status(200).json({
          status: 'success',
          message: 'user data successfully fetched',
          user,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: 'fail',
          message: 'something went wrong!',
        });
      }
    }
  )
  .delete(
    authController.protect,
    authController.accessTo('admin'),
    async (req, res) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
          status: 'success',
          message: 'user successfully deleted by admin',
        });
      } catch (err) {
        console.log(err);
        res.status(200).json({
          status: 'success',
          message: 'something went wrong!',
        });
      }
    }
  )
  .patch(
    authController.protect,
    authController.accessTo('admin'),
    async (req, res) => {
      try {
        await User.findByIdAndUpdate(req.params.id);
        res.status(200).json({
          status: 'success',
          message: 'user successfully updated by admin',
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: 'success',
          message: 'something went wrong!',
        });
      }
    }
  );

module.exports = router;
