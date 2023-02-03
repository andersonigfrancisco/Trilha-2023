import http from 'node:http'

const user = []

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/user') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(user))
  }

  if(method==="POST" && url ==="/user"){

    const { name, email } = req.body

    user.push({
      id: 1,
      name,
      email,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)