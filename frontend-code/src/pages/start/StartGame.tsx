import React, { useEffect } from 'react'
import { useWebSocket } from '../../context/WebSocketContext'
import GameNameInput from '../../components/form/GameNameInput'
import { useMutation } from '@tanstack/react-query'
import API from '../../api'

function StartGame() {
  const { clientId } = useWebSocket()
  const [gameState, setGameState] = React.useState<
    'name-input' | 'display-room-code' | 'loading'
  >('name-input')

  const [gameCode, setGameCode] = React.useState('')

  //enter host name
  const mutation = useMutation({
    mutationFn: API.StartGame,
    onSuccess: (data) => {
      setGameCode(data.gameCode)
      setGameState('display-room-code')
    },
  })

  const handleSubmit = (gameName: string) => {
    mutation.mutate({
      clientId: clientId ?? '',
      gameName: gameName,
    })
  }

  useEffect(() => {
    if (mutation.isPending) {
      setGameState('loading')
    }
  }, [mutation.isPending])

  return (
    <div>
      <h6>Start Game</h6>
      {gameState === 'name-input' ? (
        <GameNameInput onSubmit={handleSubmit} />
      ) : gameState === 'display-room-code' ? (
        <>Room code is {gameCode}</>
      ) : (
        <>
          <div>loading...</div>
        </>
      )}
    </div>
  )
}

export default StartGame
