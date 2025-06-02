import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import StartGame from './pages/start/StartGame'
import WebSocketProvider from './context/WebSocketContext'
import JoinGame from './pages/join/JoinGame'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const LandingPage = () => {
  const navigate = useNavigate()
  const handleClickStart = () => {
    navigate('/start')
  }

  const handleClickJoin = () => {
    navigate('/join')
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-radial-gradient">
      <div className="p-2">
        <h2 className="font-inika text-8xl text-white font-bold">Choy!</h2>
        <div className="flex-col mt-8 w-full space-y-4">
          <button className="w-full" onClick={handleClickStart}>
            Create new session
          </button>

          <button className="w-full" onClick={handleClickJoin}>
            Join session
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WebSocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/start" element={<StartGame />} />
              <Route path="/join" element={<JoinGame />} />
            </Routes>
          </BrowserRouter>
        </WebSocketProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
