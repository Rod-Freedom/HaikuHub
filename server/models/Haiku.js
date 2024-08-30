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
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "User"
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
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "User"
      }
    }
  ]
});

const Haiku = model('Haiku', haikuSchema);

module.exports = Haiku;
