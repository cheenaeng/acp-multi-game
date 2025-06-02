import React from 'react'

function GameNameInput({ onSubmit }: { onSubmit: (gameName: string) => void }) {
  const [gameName, setGameName] = React.useState('')

  const handleClickSubmitBtn = () => {
    onSubmit(gameName)
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-100 flex flex-col justify-center">
        <div className="w-full mb-4">
          <input
            className="w-80"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => {
              setGameName(e.target.value)
            }}
          />
        </div>
        <button
          className="w-80"
          onClick={() => {
            handleClickSubmitBtn()
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default GameNameInput
