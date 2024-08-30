const { User, Haiku } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('haikus');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('haikus');
    },
    haikus: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Haiku.find(params).sort({ createdAt: -1 });
    },
    haiku: async (parent, { haikuId }) => {
      return Haiku.findOne({ _id: haikuId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('haikus');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addHaiku: async (parent, { haikuText }, context) => {
      if (context.user) {
        console.log(context.user)
        const haiku = await Haiku.create({
          haikuText,
          haikuAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { haikus: haiku._id } }
        );

        return haiku;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { haikuId, commentText }, context) => {
      if (context.user) {
        return Haiku.findOneAndUpdate(
          { _id: haikuId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeHaiku: async (parent, { haikuId }, context) => {
      if (context.user) {
        const haiku = await Haiku.findOneAndDelete({
          _id: haikuId,
          haikuAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { haikus: haiku._id } }
        );

        return haiku;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { haikuId, commentId }, context) => {
      if (context.user) {
        return Haiku.findOneAndUpdate(
          { _id: haikuId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addLike: async (parent, { haikuId }, context) => {
      console.log(context.user);
      if (context.user) {
        return Haiku.findOneAndUpdate(
          { _id: haikuId },
          {
            $addToSet: {
              likes: context.user.username,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
