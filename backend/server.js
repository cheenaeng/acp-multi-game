import express from 'express'
import { startWebSocketServer } from './src/websocket/index.js'
import { PORT } from './constants/index.js'
import { createServer } from 'http'
import routes from './src/http/routes.js'
import './redisClient/index.js'
import cors from 'cors'

const app = express()

const corsWhitelist = ['http://localhost:5173', 'https://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      // log('out', 'Domain not allowed by CORS', origin) // replace to fix logging spam
      callback(null)
    }
  },
  methods: ['GET', 'POST'], // Specify allowed methods
  allowedHeaders: [
    'X-Request-Id',
    'Accept',
    'Authorization',
    'Content-Type',
    'X-CSRF-Token',
    'sentry-trace',
    'baggage',
  ],
}
app.use(cors(corsOptions))
app.use(express.json())
// Create HTTP server
const server = createServer(app) // Use 'app' instead of a custom request/response handler

// Initialize WebSocket server and attach to the same HTTP server
const wsclient = startWebSocketServer(server)

// Attach WebSocket client data to req object via middleware
const attachWebSocketClients = (clients) => {
  return (req, res, next) => {
    req.wsclient = clients
    next()
  }
}

app.use(attachWebSocketClients(wsclient))

app.use('/', routes)

// Start the server
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`)
})
