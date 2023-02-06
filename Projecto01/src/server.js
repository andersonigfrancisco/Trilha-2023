import http from 'node:http'

import { json } from './middlewares/json.js'


const user = []

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/user') {
    return res
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