import { mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it } from "vitest"
import { PriceTag } from "#components"

// Resolved through `#components` rather than a direct `.vue` path so that
// `nuxt typecheck` (which runs tsc in build mode) can type the import.
const mountPrice = (amount: number): ReturnType<typeof mountSuspended> =>
  mountSuspended(PriceTag, { props: { amount } })

describe("PriceTag", () => {

  it("formats amounts with Indian digit grouping", async () => {

    expect((await mountPrice(125000)).text()).toContain("1,25,000")

  })

  it("renders whole rupees with the 'From' qualifier", async () => {

    const text = (await mountPrice(499)).text()

    expect(text).toContain("From")
    expect(text).toContain("Rs. 499")

  })

})
