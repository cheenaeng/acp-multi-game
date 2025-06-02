import React from 'react'
import BackButton from '../Button/BackButton'

function HoldingGamePageLayout({
  title,
  children,
  onBackClick,
}: {
  title: string
  children: React.ReactNode
  onBackClick: () => void
}) {
  return (
    <div className="h-screen w-screen ">
      <div className="flex-col w-full justify-center items-center">
        <div className="m-4 flex">
          <div className="flex justify-center items-center">
            <BackButton onClick={onBackClick} />
          </div>
          <p className="font-bold text-2xl p-2">{title}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default HoldingGamePageLayout
