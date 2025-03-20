import React, { useMemo } from 'react'

const initalState = {
  clientId: null,
}

interface WebSocketContextType {
  clientId: string | null
}

const WebSocketContext = React.createContext<WebSocketContextType>(initalState)

// create a WebSocket context provider
const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = React.useRef<WebSocket | null>(null)
  const SOCKET_URL = 'ws://localhost:8080/' // Use a working WebSocket server for testing
  const [clientId, setClientId] = React.useState<string | null>(null)

  React.useEffect(() => {
    ws.current = new WebSocket(SOCKET_URL)

    ws.current.onopen = () => {
      console.log('WebSocket connected')
      ws.current?.send('Hello Server!')
    }

    ws.current.onmessage = (event) => {
      // convert to json for event data
      const data = JSON.parse(event.data)
      if (data?.id) {
        // set id to memory
        setClientId(data.id)
      }
    }

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.current.onclose = (event) => {
      console.log('WebSocket disconnected', event.reason)
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const clientInfo = useMemo(() => {
    return { clientId }
  }, [clientId])

  return (
    <WebSocketContext.Provider value={clientInfo}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = React.useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

export default WebSocketProvider
