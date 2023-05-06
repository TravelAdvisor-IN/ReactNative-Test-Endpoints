const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const filePath = path.join(__dirname, 'homepage.json');
const azureFile = path.join(__dirname, 'azuremap.json')

const server = http.createServer((req, res) => {
  if (req.url === '/homepage' && req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  }
  else if (req.url === '/azure' && req.method === 'GET') {
    fs.readFile(azureFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

server.listen(port, () => {
  const address = server.address();
  console.log(`Server running at http://${address.address}:${address.port}`);
});
