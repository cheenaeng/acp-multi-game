import express from 'express'
import { setKey, getKey } from '../util/redis/index.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

const generateGameCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

router.post('/start-game', (req, res) => {
  const { name, clientId } = req.body

  if (!name || !clientId) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const gameCode = generateGameCode() // Function to generate a 4-letter code
  setKey(
    gameCode,
    JSON.stringify({
      host: {
        name,
        clientId,
      },
      guests: [],
    })
  )
  res.json({ gameCode })
})

router.post('/join-game', (req, res) => {
  const { gameCode, playerName, clientId } = req.body

  if (!gameCode || !playerName || !clientId) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  getKey(gameCode).then((value) => {
    if (!value) {
      return res.status(400).json({ error: 'Game not found' })
    }

    const game = JSON.parse(value)
    const guestInfo = {
      name: playerName,
      clientId,
    }

    if (game.guests.length < 3) {
      game.guests.push(guestInfo)
      setKey(gameCode, JSON.stringify(game)) // Update the Redis store
      req.wsclient.joinGame(gameCode, clientId, playerName) // Call the WebSocket function
      return res.json({ success: true, game })
    } else {
      return res.status(400).json({ error: 'Game is full' })
    }
  })
})

export default router
