import React from 'react'

function GameNameInput({ onSubmit }: { onSubmit: (gameName: string) => void }) {
  const [gameName, setGameName] = React.useState('')

  const handleClickSubmitBtn = () => {
    onSubmit(gameName)
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Game Name"
        onChange={(e) => {
          setGameName(e.target.value)
        }}
      />
      <button
        onClick={() => {
          handleClickSubmitBtn()
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default GameNameInput
