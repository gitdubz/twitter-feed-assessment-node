const {
  unionUsersFollowingCollection,
  formatTweetsCollection,
  getCombinedUserFeed
} = require('../../_helpers/dataFormatting');

const usersData = ['A follows B', 'A follows B, C', 'B follows A', 'C follows A', 'C follows A, B'];

const tweetsData = ['A> Sup B?!', 'B> A, where is my car?!', 'C> Spiderpig, Spiderpig'];

describe('Helpers > dataFormatting', () => {
  describe('- unionUsersFollowingCollection', () => {
    test('it should return a unified collection of users with their followers', () => {
      const output = unionUsersFollowingCollection(usersData);
      expect(output).toEqual({
        A: { following: ['B', 'C'] },
        B: { following: ['A'] },
        C: { following: ['A', 'B'] }
      });
    });
  });

  describe('- formatTweetsCollection', () => {
    test('it should return a collection for tweets', async () => {
      const output = formatTweetsCollection(tweetsData);
      expect(output).toEqual([
        { user: 'A', msg: 'Sup B?!' },
        { user: 'B', msg: 'A, where is my car?!' },
        { user: 'C', msg: 'Spiderpig, Spiderpig' }
      ]);
    });
  });

  describe('- getCombinedUserFeed', () => {
    test('it should return a collection for tweets', async () => {
      const output = getCombinedUserFeed(usersData, tweetsData);
      expect(output).toEqual({
        A: [
          {
            msg: 'Sup B?!',
            user: 'A'
          },
          {
            msg: 'A, where is my car?!',
            user: 'B'
          },
          {
            msg: 'Spiderpig, Spiderpig',
            user: 'C'
          }
        ],
        B: [
          {
            msg: 'Sup B?!',
            user: 'A'
          },
          {
            msg: 'A, where is my car?!',
            user: 'B'
          }
        ],
        C: [
          {
            msg: 'Sup B?!',
            user: 'A'
          },
          {
            msg: 'A, where is my car?!',
            user: 'B'
          },
          {
            msg: 'Spiderpig, Spiderpig',
            user: 'C'
          }
        ]
      });
    });
  });
});
