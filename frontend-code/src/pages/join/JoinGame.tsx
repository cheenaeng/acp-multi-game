import React from 'react'
import { useWebSocket } from '../../context/WebSocketContext'

import { useMutation } from '@tanstack/react-query'
import API from '../../api'

function JoinGame() {
  const { clientId } = useWebSocket()
  const [gameCode, setGameCode] = React.useState('')
  const [gameName, setGameName] = React.useState('')
  const [gameState, setGameState] = React.useState<
    'name-input' | 'waiting-room'
  >('name-input')

  const mutation = useMutation({
    mutationFn: API.JoinGame,
    onSuccess: (data) => {
      console.log(data)
      setGameState('waiting-room')
    },
  })

  const handleClickSubmit = () => {
    mutation.mutate({
      clientId: clientId ?? '',
      gameCode: gameCode,
      gameName: gameName,
    })
  }
  return (
    <div>
      {gameState === 'name-input' ? (
        <div>
          <div>
            <input
              type="text"
              placeholder="Enter Game Code"
              onChange={(e) => {
                setGameCode(e.target.value)
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Game Name"
              onChange={(e) => {
                setGameName(e.target.value)
              }}
            />
          </div>
          <button onClick={handleClickSubmit}>Submit</button>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}

export default JoinGame
