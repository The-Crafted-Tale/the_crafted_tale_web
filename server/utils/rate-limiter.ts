interface RateLimitEntry {
   count: number
   resetAt: number
}

export class RateLimiter {

   private store = new Map<string, RateLimitEntry>()
   private maxRequests: number
   private windowMs: number
   private cleanupInterval: ReturnType<typeof setInterval>

   constructor(maxRequests: number, windowMs: number) {

      this.maxRequests = maxRequests
      this.windowMs = windowMs

      this.cleanupInterval = setInterval(() => this.cleanup(), windowMs * 2)

      if (this.cleanupInterval.unref) {

         this.cleanupInterval.unref()

      }

   }

   check(key: string): { allowed: boolean, retryAfterMs: number } {

      const now = Date.now()

      const entry = this.store.get(key)

      if (!entry || now >= entry.resetAt) {

         this.store.set(key, { count: 1, resetAt: now + this.windowMs })

         return { allowed: true, retryAfterMs: 0 }

      }

      if (entry.count < this.maxRequests) {

         entry.count++

         return { allowed: true, retryAfterMs: 0 }

      }

      return { allowed: false, retryAfterMs: entry.resetAt - now }

   }

   private cleanup() {

      const now = Date.now()

      for (const [key, entry] of this.store) {

         if (now >= entry.resetAt) {

            this.store.delete(key)

         }

      }

   }

}

const limiters = new Map<string, RateLimiter>()

export const useRateLimiter = (
   name: string,
   maxRequests: number,
   windowMs: number,
): RateLimiter => {

   let limiter = limiters.get(name)

   if (!limiter) {

      limiter = new RateLimiter(maxRequests, windowMs)
      limiters.set(name, limiter)

   }

   return limiter

}
