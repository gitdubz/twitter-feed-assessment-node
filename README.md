# Getting up and running

> For the purposes of this exercise only npm was catered for in terms of lock files
> Total time spent was around 3-5 hours including this document :D
> Please spend the time reading the readme :D
> By running `$ npm run test` you should see the output

## Options considered for the example

- seed a database with the text files and interact with the database (complexity in setup for reviewer - docker needed etc)
- read the text and manually build data structures (more fun)
- front-end only with create-react-app allowing user to upload the files and see a sexy UI (probably not sticking to the brief for output, would have probably been the fastest solution)
- do micro-services (would be cool but have personal time constraints and complexity of setup for reviewer - docker needed etc)
  - file-reader service
  - data-formatter service
  - db-seeder service
  - get-feed service
  - web service

## Additional Notes

- Hand coded (with some googling help) and tried to use as little helper libraries as possible when interacting with the data lodash > union was used.
- Testing was done using jest and supertest
- Some of the data manipulation to get to the end result could be way simpler but wanted to show thought in data transformation - example, there was no need to format the tweets file to be [{ user: 'A', msg: 'my message' }], a simple `` startsWith(`${user}> `) `` could have been done eliminating additional loops and functions
- If a SQL DB was to be used character limits for tweets would have been considered for table schemas, 4 tables would be created, one for users, one joining table for relationships in following, one for tweets one for relationships between users and tweets

## Assumptions

- the text files provided could grow - so used a `createReadStream` as opposed to the `readFileSync` although it might not impact performance on such a small file
- no CI config was required (one can be supplied if needed)
- no logging to external services like splunk or sentry etc was required
- no caching was required (caching can be added - for the purposes of this I would ave used memcached but love redis)
- no guards required for routes - only helmet was added to show thought towards protection
- self-healing would be handled by environment such as kubernetes etc
- https would be handled by the environment
- output to node console and response to browser would be okay

## Accessing the server

Depending on the `PORT` you have chosen the application should be available on http://localhost:2001 by default

## Installation

`$ npm install` or `$ yarn`

## Environment Variables

Rename `.env.sample` to `.env`

or you can run `$ NODE_ENV=production PORT=3000 npm run start`

## Running Tests

`$ npm run test` or `$ yarn test`

## Development

`$ npm run dev` or `$ yarn dev`

## Production

`$ npm run start` or `$ yarn start`
