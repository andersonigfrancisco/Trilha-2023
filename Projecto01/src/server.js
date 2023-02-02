import http from 'node:http'

const user = []

const server = http.createServer((req,res)=>{

  const {method,url} = req

  if(method==="GET" && url ==="/user"){

    return res
    .setHeader('Content-type','aplication/json')
    .end(JSON.stringify(user))
  }

  if(method==="POST" && url ==="/user"){

    user.push({
      id: 1,
      name:'Anderson Francisco',
      email:'andersonfranciscoig@gmail.com'
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)