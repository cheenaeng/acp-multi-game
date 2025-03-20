import { createClient } from 'redis'
import 'dotenv/config'

const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST, // Default Redis host
    port: Number(process.env.REDIS_PORT), // Default Redis port
  },
  password: process.env.REDIS_PASSWORD,
})

redis.on('error', (err) => {
  console.error('Redis error:', err)
})

redis
  .connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Redis connection error:', err))

export default redis
