import React, { useEffect } from 'react'
import { useWebSocket } from '../../context/WebSocketContext'
import GameNameInput from '../../components/form/GameNameInput'
import { useMutation } from '@tanstack/react-query'
import API from '../../api'
import HoldingGamePageLayout from '../../components/layout/HoldingGamePageLayout'
import { useNavigate } from 'react-router-dom'

function StartGame() {
  const { clientId } = useWebSocket()
  const [gameState, setGameState] = React.useState<
    'name-input' | 'display-room-code' | 'loading'
  >('name-input')

  const [gameCode, setGameCode] = React.useState('')
  const navigate = useNavigate()

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

  const onBackClick = () => {
    navigate('/')
  }
  return (
    <HoldingGamePageLayout
      title={'Create new session'}
      onBackClick={onBackClick}
    >
      <div>
        {gameState === 'name-input' ? (
          <GameNameInput onSubmit={handleSubmit} />
        ) : gameState === 'display-room-code' ? (
          <p>Room code is {gameCode}</p>
        ) : (
          <>
            <div>loading...</div>
          </>
        )}
      </div>
    </HoldingGamePageLayout>
  )
}

export default StartGame
