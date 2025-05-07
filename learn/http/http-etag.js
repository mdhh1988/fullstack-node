import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import checksum from 'checksum';
import mime from 'mime';
import path from 'node:path';

const server = http.createServer((req, res) => {
  let filePath = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), path.join('www', `///${req.url}`));

  if(!fs.existsSync(filePath)) {
    res.writeHead(404, {
      'ContentType': 'text/html; charset=utf-8'
    })
    return res.end('<h1>Not Found</h1>');
  } else {
    const stats = fs.statSync(filePath);
    const isDir = stats.isDirectory()
  
    if(isDir) {
      filePath = path.join(filePath, 'index.html');
    }
    
    checksum.file(filePath, (err, sum) => {
      const resStream = fs.createReadStream(filePath);
      sum = `${sum}`;
      if(req.headers['if-none-match'] === sum) {
        res.writeHead(304, {
          'Content-type': mime.getType(filePath),
          'etag': sum
        })
        res.end();
      } else {
        res.writeHead(200, {
          'Content-type': mime.getType(filePath),
          'etag': sum
        })
        resStream.pipe(res);
      }
    })
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(1205, () => {
  console.log('HTTP server listening on', server.address());
})