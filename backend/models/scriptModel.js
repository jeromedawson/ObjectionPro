const mongoose = require('mongoose');

const scriptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2, // Minimum length of 2 characters
      maxlength: 100, // Maximum length of 100 characters
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10, // Minimum length of 10 characters
      maxlength: 5000, // Maximum length of 5000 characters
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 2, // Minimum length of 2 characters
      maxlength: 100, // Maximum length of 100 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Add index for createdAt field, if necessary for query performance
    },
  },
  {
    timestamps: true, // Enable timestamps to automatically manage createdAt and updatedAt fields
  }
);

const Script = mongoose.model('Script', scriptSchema);

module.exports = Script;
