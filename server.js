const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const data = require('./assets/sample-data.json');

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
