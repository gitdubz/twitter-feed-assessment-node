const app = require('./app');

const server = app.listen(app.get('port'), () => {
  const { address, port } = server.address();
  console.log(`Running "${app.get('env')}" server on http://%s:%s`, address, port);
});
