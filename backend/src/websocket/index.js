import { WebSocketServer } from 'ws'
import uuid from 'uuid-random'

// This will hold all game rooms, where the key is the game code and the value is a list of WebSocket clients.
const gameRooms = new Map()

export function startWebSocketServer(server) {
  const wss = new WebSocketServer({ server })

  // This function is accessible globally to handle game-related actions
  function joinGame(gameCode, client, playerName) {
    if (!gameRooms.has(gameCode)) {
      gameRooms.set(gameCode, [])
    }
    const playersInGame = gameRooms.get(gameCode)
    playersInGame.push(client)

    // broadcastToRoom(gameCode, 'player-joined', { playerName })

    console.log(`${playerName} joined game ${gameCode}`)
  }

  // // Broadcast a message to all players in a specific game room
  // function broadcastToRoom(gameCode, eventType, message) {
  //   const playersInGame = gameRooms.get(gameCode)

  //   if (playersInGame) {
  //     playersInGame.forEach((player) => {
  //       player.send(JSON.stringify({ type: eventType, ...message }))
  //     })
  //   }
  // }

  //leave game
  function leaveGame(gameCode, client, playerName) {
    const playersInGame = gameRooms.get(gameCode)
    const index = playersInGame.indexOf(client)

    if (index > -1) {
      playersInGame.splice(index, 1)
    }

    // broadcastToRoom(gameCode, 'player-left', { playerName })

    console.log(`${playerName} left game ${gameCode}`)
  }

  // When a new client connects to the WebSocket server
  wss.on('connection', function connection(client) {
    // Assign a unique ID to each client
    client.id = uuid()

    console.log(`Client ${client.id} Connected!`)

    // Send the client their unique ID when they first connect
    client.send(`{"id": "${client.id}"}`)

    // Handle incoming messages from the client
    client.on('message', (data) => {
      // Add your message processing logic here (for example, process join game)
      console.log(`Received message from ${client.id}: ${data}`)
    })

    // When a client disconnects
    client.on('close', () => {
      console.log('This Connection Closed!')
      console.log(`Removing Client: ${client.id}`)
    })
  })

  // Log when the WebSocket server is listening
  wss.on('listening', () => {
    console.log('WebSocket server listening on port 8080')
  })

  // Return the WebSocket-related functions so they can be used in other files
  return { joinGame, leaveGame }
}
