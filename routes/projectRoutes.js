const express = require('express');
const Project = require('../model/projectModel');
const authController = require('./../controller/authController');
const { uploadProjectDocs } = require('./../controller/projectController');
const { route } = require('./userRoutes');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      let projects;
      if (req.user.role === 'employee') {
        projects = await Project.find({ members: { $in: req.user._id } });
      } else if (req.user.role === 'mentor') {
        projects = await Project.find({ mentor: req.user._id });
      } else if (req.user.role === 'admin') {
        projects = await Project.find();
      }
      res.status(200).json({
        status: 'success',
        data: {
          results: projects.length,
          message: 'All projects loaded ',
          projects,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        satus: 'fail',
        message: 'something went wrong',
      });
    }
  })
  .post(authController.accessTo('admin', 'mentor'), async (req, res) => {
    try {
      // console.log('body data by user ', req.body);
      // console.log(JSON.stringify(req.body.members).slice(1, -1).length);
      // let members = JSON.stringify(req.body.members).slice(1, -1);
      // const data = {
      //   name: req.body.name,
      //   startDate: req.body.startDate,
      //   endDate: req.body.endDate,
      //   description: req.body.description,
      //   members,
      //   featureImage: req.body.featureImage,
      //   documents: req.body.documents,
      //   mentor: req.user._id,
      //   isApproved: req.body.isApproved,
      //   isCompleted: req.body.isCompleted,
      // };
      // console.log(req.body.members);
      const project = await Project.create({
        ...req.body,
        mentor: req.user._id,
      });
      res.status(201).json({
        status: 'success',
        data: {
          project,
          message: 'project successfully created',
        },
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({
          status: 'fail',
          message: err.message || 'project creation failed',
        });
      }
      res.status(500).json({
        status: 'fail',
        message: 'project creation failed',
      });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(400).json({
          status: 'fail',
          message: 'no project found with this id',
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          project,
        },
      });
    } catch (err) {
      console.log(err);
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).json({
          status: 'fail',
          message: `invalid id ${err.message}`,
        });
      }
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        err,
      });
    }
  })
  .patch(async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'project updated successfully',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong!',
      });
    }
  })
  .delete(async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        message: 'project deleted success',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong!',
      });
    }
  });

//upload files to project
router
  .route('/:id/upload')
  .patch(
    authController.accessTo('admin', 'mentor'),
    uploadProjectDocs,
    async (req, res) => {
      try {
        const project = await Project.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.status(201).json({
          status: 'success',
          data: {
            message: 'project files successfully uploaded',
          },
        });
      } catch (err) {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({
            status: 'fail',
            message: err.message || 'project creation failed',
          });
        }
        res.status(500).json({
          status: 'fail',
          message: 'project creation failed',
        });
      }
    }
  );
module.exports = router;
