import net from 'node:net'

function responseData(str) {
  return `HTTP/1.1 200 OK  
  Connection: keep-alive
  Date: ${new Date()} 
  Content-Length: ${str.length} 
  Content-Type: text/html 

  ${str}`
}

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    if(/^GET \/ HTTP/.test(data)) {
      socket.write(responseData('<h1>Hello World</h1>'))
      // socket.write('test')
    }
    console.log(`DATA:\n\n${data}`)
  })

  socket.on('close', () => {
    console.log('Connection closed')
  })
}).on('error', (err) => {
  throw err;
})

server.listen({
  host: '0.0.0.0',
  port: 1021,
}, () => {
  console.log('TCP server listening on', server.address())
})