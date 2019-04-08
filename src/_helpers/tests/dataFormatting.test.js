const {
  unionUsersFollowingCollection,
  formatTweetsCollection,
  getCombinedUserFeed,
  isValidLine,
  formatFeed
} = require('../../_helpers/dataFormatting');

const usersData = [
  'A follows B',
  'A follows B, C',
  'B follows A',
  'C follows A',
  'C follows A, B',
  'Woot Happened Here'
];

const tweetsData = ['A> Sup B?!', 'B> A, where is my car> ?!', 'C> Spiderpig, Spiderpig', '> ', ' > '];

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

  describe('- isValidLine', () => {
    test('it should check if a given delimiter is present in a string and return a boolean value', async () => {
      expect(isValidLine('Hulk> Thanos', '> ')).toEqual(true);
      expect(isValidLine('> ', '> ')).toEqual(false);
      expect(isValidLine(' > ', '> ')).toEqual(true);
      expect(isValidLine('A follows B', ' follows ')).toEqual(true);
      expect(isValidLine('A follow B', ' follows ')).toEqual(false);
      expect(isValidLine('AB', ' follows ')).toEqual(false);
      expect(isValidLine('A follows Follows', ' follows ')).toEqual(true);
    });
  });

  describe('- formatTweetsCollection', () => {
    test('it should return a collection for tweets', async () => {
      const output = formatTweetsCollection(tweetsData);
      expect(output).toEqual([
        { user: 'A', msg: 'Sup B?!' },
        { user: 'B', msg: 'A, where is my car> ?!' },
        { user: 'C', msg: 'Spiderpig, Spiderpig' }
      ]);
    });

    test('it should return a collection for tweets', async () => {
      const output = formatTweetsCollection(tweetsData);
      expect(output).toEqual([
        { user: 'A', msg: 'Sup B?!' },
        { user: 'B', msg: 'A, where is my car> ?!' },
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
            msg: 'A, where is my car> ?!',
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
            msg: 'A, where is my car> ?!',
            user: 'B'
          }
        ],
        C: [
          {
            msg: 'Sup B?!',
            user: 'A'
          },
          {
            msg: 'A, where is my car> ?!',
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

  describe('- formatFeed', () => {
    test('it should return a formatted version of output', () => {
      const output = formatFeed({ USER: [{ user: 'Handle', msg: 'Message' }] });
      expect(output).toEqual(`USER\r\n\t@Handle: Message\r\n`);
    });
  });
});
