import { Redis } from 'ioredis'
import { logger } from './logger'

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL
  }
  
  throw new Error('REDIS_URL is not defined')
}

export const redis = new Redis(getRedisUrl(), {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 3) {
      return null
    }
    return Math.min(times * 50, 2000)
  },
  reconnectOnError: (err) => {
    logger.error('Redis connection error:', err)
    return true
  }
})