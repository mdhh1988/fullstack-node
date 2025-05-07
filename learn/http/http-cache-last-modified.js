/**
 * 静态文件服务
 * 1. 解析请求路径
 * 2. 读取请求的文件
 * 3. 返回文件内容
 */
import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import mime from 'mime';

const server = http.createServer((req, res) => {
  // 将url解析成文件路径
  let filePath = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), path.join('www', `///${req.url}`));

  // 如果请求的路径是目录，则返回index.html
  if(fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const isDir = stats.isDirectory()

    if(isDir) {
      filePath = path.join(filePath, 'index.html');
    }

    if(!isDir || fs.existsSync(filePath))  {
      const {ext} = path.parse(filePath);
      const timestamp = req.headers['if-modified-since'];
      let status = 200;
      if(timestamp && Number(timestamp) === stats.mtimeMs) {
        status = 304;
      }
      res.writeHead(status, {
        'Content-Type': mime.getType(ext),
        'Cache-Control': 'max-age=86400, public',
        'last-modified': stats.mtimeMs, // 协商缓存头信息，最后一次修改时间
      })
      if(status === 200) {
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } else {
        res.end();
      }
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end('<h1>Not Found</h1>')
  }
})

server.on('clientError', (err, socket)=> {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

server.listen(1205, () => {
  console.log('HTTP server listening on', server.address());
})