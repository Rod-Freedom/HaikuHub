const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const haikuSchema = new Schema({
  haikuText: {
    type: String,
    required: true, //o no se mijos no se me ocurre 
    minlength: 1,
    maxlength: 300,
    trim: true,
  },
  haikuAuthor: {
    type: String,
    required: true,
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
        maxlength: 300,
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
      likes: [String],
    },
  ],
  likes: [String],
});

const Haiku = model('Haiku', haikuSchema);

module.exports = Haiku;
