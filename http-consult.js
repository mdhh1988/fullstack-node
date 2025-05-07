import http from 'node:http';
import url from 'node:url';

// 请求的返回信息
const responseData = {
  ID: 'ID1',
  Name: 'Name1',
  RegisterDate: '2023-10-01',
}

// 转换为HTML结构
function responseHTML(data) {
  return `
    <ul>
      <li>ID: ${data.ID}</li>
      <li>Name: ${data.Name}</li>
      <li>RegisterDate: ${data.RegisterDate}</li>
    </ul>
  `
}

const server = http.createServer((req, res) => {
  const {pathname} = url.parse(`http://${req.headers.host}${req.url}`);
  if(pathname === '/') {
    const accept = req.headers['accept'];
    if(req.method === 'POST' || accept.indexOf('application/json') >= 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseData));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(responseHTML(responseData));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Not Found</h1>');
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

server.listen(1205, () => {
  console.log('HTTP server listening on', server.address());
})