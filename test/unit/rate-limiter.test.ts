import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { RateLimiter, useRateLimiter } from "../../server/utils/rate-limiter"

describe("RateLimiter", () => {

  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it("allows requests up to the limit, then blocks", () => {

    const limiter = new RateLimiter(3, 60_000)

    expect(limiter.check("1.1.1.1").allowed).toBe(true)
    expect(limiter.check("1.1.1.1").allowed).toBe(true)
    expect(limiter.check("1.1.1.1").allowed).toBe(true)
    expect(limiter.check("1.1.1.1").allowed).toBe(false)

  })

  it("tracks each key separately", () => {

    const limiter = new RateLimiter(1, 60_000)

    expect(limiter.check("1.1.1.1").allowed).toBe(true)
    expect(limiter.check("1.1.1.1").allowed).toBe(false)
    expect(limiter.check("2.2.2.2").allowed).toBe(true)

  })

  it("reports how long the caller has to wait", () => {

    const limiter = new RateLimiter(1, 60_000)

    limiter.check("1.1.1.1")
    vi.advanceTimersByTime(20_000)

    expect(limiter.check("1.1.1.1").retryAfterMs).toBe(40_000)

  })

  it("starts a fresh window once the old one expires", () => {

    const limiter = new RateLimiter(1, 60_000)

    expect(limiter.check("1.1.1.1").allowed).toBe(true)
    expect(limiter.check("1.1.1.1").allowed).toBe(false)

    vi.advanceTimersByTime(60_000)

    expect(limiter.check("1.1.1.1").allowed).toBe(true)

  })

})

describe("useRateLimiter", () => {

  it("returns the same instance for a given name", () => {

    expect(useRateLimiter("contact", 5, 60_000)).toBe(useRateLimiter("contact", 5, 60_000))

  })

  it("keeps separate instances for different names", () => {

    expect(useRateLimiter("contact", 5, 60_000)).not.toBe(useRateLimiter("subscribe", 5, 60_000))

  })

})
