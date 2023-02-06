import { randomUUID } from 'node:crypto';
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath('/users'),
    hander: (req, res) => {

      const users = database.select('users')

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: "POST",
    path: buildRoutePath('/users'),
    hander: (req, res) => {

      const { name, email } = req.body

      const users = { id: randomUUID(), name, email, }

      database.insert('users', users)

      return res.writeHead(201).end(JSON.stringify(users))
    }
  },
  {
    method: 'DELETE',
    path: '/users/ID',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      return res.end()
    }
  }
]