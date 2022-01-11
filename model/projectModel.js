const mongoose = require('mongoose');

const slugify = require('slugify');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'project must have a name'],
  },
  startDate: {
    type: Date,
    required: [true, 'project must have a date'],
  },
  description: {
    type: String,
    required: [true, 'project must have an description'],
    trim: true,
  },
  endDate: {
    type: Date,
    required: [true, 'project must have an end date'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'project must assign to a developer or other member'],
    },
  ],
  mentor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'project must assign to a mentor or other member'],
  },
  documents: [String],
  featureImage: {
    type: String,
    default: 'default.jpg',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  slug: String,
});

//save slug before saving to database
projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { trim: true, lower: true });
  next();
});

//this can populate users data
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'members mentor',
  });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
