const mongoose = require('mongoose');

const objectionSchema = new mongoose.Schema(
  {
    objectionType: {
      type: String,
      required: [true, 'Please provide an objection type.'],
      minlength: [3, 'Objection type must be at least 3 characters long.'],
      maxlength: [100, 'Objection type cannot exceed 100 characters.'],
      index: true, // Apply indexing to the objectionType field
      unique: true, // Add a unique constraint to ensure objectionType uniqueness
    },
    rebuttal: {
      type: String,
      required: [true, 'Please provide a rebuttal.'],
      minlength: [10, 'Rebuttal must be at least 10 characters long.'],
      maxlength: [500, 'Rebuttal cannot exceed 500 characters.'],
    },
  },
  { timestamps: true }
);

const Objection = mongoose.model('Objection', objectionSchema);

module.exports = Objection;
