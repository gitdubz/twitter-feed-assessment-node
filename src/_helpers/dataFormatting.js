const union = require('lodash.union');

/**
 * @function isValidLine
 * @description checks if text has minimum what we expect
 * we assume that the index will need to be bigger than 0
 * @param {String} str
 * @param {String} delimiter
 * @returns {Boolean}
 */
exports.isValidLine = (str, delimiter) => str.indexOf(delimiter) > 0;

/**
 * @function unionUsersFollowingCollection
 * @description unions a users following list
 * @param {Array} usersData
 * @returns {Object} collection of users with list of following
 */
exports.unionUsersFollowingCollection = usersData =>
  usersData.sort().reduce((usersObj, user) => {
    const delimiter = ' follows ';
    if (!exports.isValidLine(user, delimiter)) {
      return usersObj;
    }

    const [username, following] = user.split(delimiter);
    const followingArray = following.split(', ');
    const existingUserData = usersObj[username];
    usersObj[username] = {
      following: union(existingUserData, followingArray)
    };

    followingArray.forEach(user => {
      if (!usersObj.hasOwnProperty(user)) {
        usersObj[user] = { following: [] };
      }
    });

    return usersObj;
  }, {});

/**
 * @function formatTweetsCollection
 * @description formats raw data to array of objects
 * @param {Array} tweetsData
 * @returns {Array} array of objects
 */
exports.formatTweetsCollection = tweetsData =>
  tweetsData.reduce((tweetsArr, tweet) => {
    const delimiter = '> ';
    if (!exports.isValidLine(tweet, delimiter)) {
      return tweetsArr;
    }
    let [user, ...msg] = tweet.split(delimiter);
    if (user.trim() === '' || (!Array.isArray(msg) && msg.trim() === '')) {
      return tweetsArr;
    }
    msg = msg.join(delimiter);
    tweetsArr.push({ user, msg });
    return tweetsArr;
  }, []);

/**
 * @function getCombinedUserFeed
 * @description merges all users & related tweets
 * @param {Object} users formatted users
 * @param {Object} tweets
 * @returns {Object} collection if user & associated tweets
 */
exports.getCombinedUserFeed = (usersData, tweetsData) => {
  const users = exports.unionUsersFollowingCollection(usersData);
  const tweets = exports.formatTweetsCollection(tweetsData);

  return Object.keys(users).reduce((feed, userId) => {
    const feedMessagesFromUser = users[userId].following.concat(userId);
    const messages = tweets.reduce((messagesArr, { user, msg }) => {
      if (feedMessagesFromUser.includes(user)) {
        messagesArr.push({ user, msg });
      }
      return messagesArr;
    }, []);

    feed[userId] = messages;

    return feed;
  }, {});
};

/**
 * @function formatFeed
 * @description formats feed to desired output
 * @param {Object} feed
 * @returns {String} formatted string
 */
exports.formatFeed = feed => {
  let text = '';
  Object.keys(feed).forEach(user => {
    text = text.concat(user);
    text = text.concat('\r\n');
    feed[user].forEach(({ user, msg }) => (text = text.concat(`\t@${user}: ${msg}\r\n`)));
  });

  return text;
};
