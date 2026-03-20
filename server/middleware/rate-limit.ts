import { useRateLimiter } from '../utils/rate-limiter'
import { getRequestIP } from 'h3'

const postLimiter = useRateLimiter('post', 5, 60_000)
const getLimiter = useRateLimiter('get', 60, 60_000)

export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/')) return

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const method = event.method.toUpperCase()

  const limiter = method === 'POST' ? postLimiter : getLimiter
  const { allowed, retryAfterMs } = limiter.check(ip)

  if (!allowed) {
    setResponseHeader(event, 'Retry-After', Math.ceil(retryAfterMs / 1000))
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.',
    })
  }
})
