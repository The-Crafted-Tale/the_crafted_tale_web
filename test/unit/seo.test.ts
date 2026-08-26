import { describe, expect, it } from "vitest"
import { META_DESCRIPTION_MAX, toMetaDescription } from "../../app/utils/seo"

describe("toMetaDescription", () => {

  it("leaves a short description alone", () => {

    expect(toMetaDescription("A handmade keyring.")).toBe("A handmade keyring.")

  })

  it("collapses the line breaks that page copy is written with", () => {

    expect(toMetaDescription("Browse gifts,\n  keepsakes  and more.")).toBe("Browse gifts, keepsakes and more.")

  })

  it("never exceeds the cap", () => {

    const long = "handcrafted sunflower keychain ".repeat(20)

    expect(toMetaDescription(long).length).toBeLessThanOrEqual(META_DESCRIPTION_MAX)

  })

  it("cuts on a word boundary and ends with an ellipsis", () => {

    const result = toMetaDescription("handcrafted sunflower keychain ".repeat(20))

    expect(result.endsWith("…")).toBe(true)
    expect(result).not.toMatch(/\s…$/)
    expect(result.slice(0, -1).split(" ").at(-1)).toBe("keychain")

  })

  it("respects a custom cap", () => {

    expect(toMetaDescription("one two three four five", 12)).toBe("one two…")

  })

})
