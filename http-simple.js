import http from 'node:http';
import url from 'node:url';

const server = http.createServer((req, res) => {
  const { pathname} = url.parse(`http://${req.headers.host}${req.url}`);
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello World</h1>');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Not Found</h1>');
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

server.listen(1205, () => {
  console.log('HTTP server listening on', server.address());
})