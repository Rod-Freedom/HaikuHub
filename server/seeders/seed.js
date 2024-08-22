const db = require('../config/connection');
const { User, Haiku } = require('../models');
const userSeeds = require('./userSeeds.json');
const haikuSeeds = require('./haikuSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Haiku', 'haikus');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < haikuSeeds.length; i++) {
      const { _id, haikuAuthor } = await Haiku.create(haikuSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: haikuAuthor },
        {
          $addToSet: {
          haikus: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
