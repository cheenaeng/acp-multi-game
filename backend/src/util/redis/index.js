import redis from '../../../redisClient/index.js'

// Store data in Redis
async function setKey(key, value, expiry) {
  try {
    await redis.set(key, value)
    if (expiry) {
      await redis.expire(key, expiry) // Set expiration time (optional)
    }
    console.log(`Stored key: ${key}`)
  } catch (error) {
    console.error('Redis SET error:', error)
  }
}

// Retrieve data from Redis
async function getKey(key) {
  try {
    const value = await redis.get(key)
    return value
  } catch (error) {
    console.error('Redis GET error:', error)
    return null
  }
}

// Delete a key from Redis
async function deleteKey(key) {
  try {
    await redis.del(key)
    console.log(`Deleted key: ${key}`)
  } catch (error) {
    console.error('Redis DEL error:', error)
  }
}

// Store structured data in a hash (e.g., player info)
async function setHash(hashKey, field, value) {
  try {
    await redis.hSet(hashKey, field, value)
    console.log(`Stored ${field} in hash ${hashKey}`)
  } catch (error) {
    console.error('Redis HSET error:', error)
  }
}

// Retrieve all fields from a hash
async function getHash(hashKey) {
  try {
    const data = await redis.hGetAll(hashKey)
    return data
  } catch (error) {
    console.error('Redis HGETALL error:', error)
    return null
  }
}

export { setKey, getKey, deleteKey, setHash, getHash }
