import { describe, expect, it } from "vitest"
import { categoryDbValues, normalizeCategory } from "../../server/utils/category"

describe("normalizeCategory", () => {

  it("maps display-style seed values to the frontend snake_case type", () => {

    expect(normalizeCategory("Ready Made")).toBe("ready_made")
    expect(normalizeCategory("Semi Custom")).toBe("semi_custom")
    expect(normalizeCategory("Custom")).toBe("custom")

  })

  it("is case-insensitive", () => {

    expect(normalizeCategory("READY MADE")).toBe("ready_made")
    expect(normalizeCategory("semi custom")).toBe("semi_custom")

  })

  it("passes through values that are already snake_case", () => {

    expect(normalizeCategory("ready_made")).toBe("ready_made")
    expect(normalizeCategory("semi_custom")).toBe("semi_custom")

  })

  it("returns an unknown category untouched rather than throwing", () => {

    expect(normalizeCategory("gift_hamper")).toBe("gift_hamper")

  })

})

describe("categoryDbValues", () => {

  it("returns both the snake_case and display spelling so queries match either", () => {

    expect(categoryDbValues("ready_made")).toEqual(["ready_made", "Ready Made"])
    expect(categoryDbValues("semi_custom")).toEqual(["semi_custom", "Semi Custom"])
    expect(categoryDbValues("custom")).toEqual(["custom", "Custom"])

  })

  it("falls back to the input for an unknown category", () => {

    expect(categoryDbValues("gift_hamper")).toEqual(["gift_hamper"])

  })

  it("round-trips every known category through normalizeCategory", () => {

    for (const category of ["ready_made", "semi_custom", "custom"]) {

      for (const dbValue of categoryDbValues(category)) {

        expect(normalizeCategory(dbValue)).toBe(category)

      }

    }

  })

})
