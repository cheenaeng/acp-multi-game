import { BACKEND_URL } from '../constants'
import axios from 'axios'

class API {
  static async StartGame({
    clientId,
    gameName,
  }: {
    clientId: string
    gameName: string
  }) {
    return axios
      .post(`${BACKEND_URL}/start-game`, {
        clientId,
        name: gameName,
      })
      .then((res) => res.data)
  }

  static async JoinGame({
    clientId,
    gameCode,
    gameName,
  }: {
    clientId: string
    gameCode: string
    gameName: string
  }) {
    return axios
      .post(`${BACKEND_URL}/join-game`, {
        clientId,
        gameCode,
        playerName: gameName,
      })
      .then((res) => res.data)
  }
}

export default API
