const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const haikuSchema = new Schema({
  haikuText: {
    type: String,
    required: 'Write a Haiku', //o no se mijos no se me ocurre 
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  haikuAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Haiku = model('Haiku', haikuSchema);

module.exports = Haiku;
