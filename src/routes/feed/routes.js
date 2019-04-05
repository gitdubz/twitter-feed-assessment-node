const express = require('express');
const { readFileToArray } = require('../../_helpers/fileReader');
const { getCombinedUserFeed, formatFeed } = require('../../_helpers/dataFormatting');
const { ASSETS_PATH } = require('../../_config/constants');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tweetsData = await readFileToArray(`${ASSETS_PATH}/tweet.txt`);
    const usersData = await readFileToArray(`${ASSETS_PATH}/user.txt`);
    const feed = getCombinedUserFeed(usersData, tweetsData);
    const formattedFeed = formatFeed(feed);

    // Logging to console here
    console.log(formattedFeed);

    // Send the response
    return res.send(formattedFeed);

    /* NOTE: If data was to be consumed by another application
      return res.json({
        status: 'success',
        data: {
          feed
        }
      });
    */
  } catch (error) {
    next(error);
  }
});

module.exports = router;
