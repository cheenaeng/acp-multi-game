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
    <div>
      <h2>WebSocket Test</h2>
      <div>
        <button onClick={handleClickStart}>start</button>
        <button onClick={handleClickJoin}>join</button>
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
