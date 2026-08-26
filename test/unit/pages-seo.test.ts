import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const PAGES_DIR = join(import.meta.dirname, "../../app/pages")

const pageFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {

    const path = join(dir, entry.name)

    return entry.isDirectory() ? pageFiles(path) : path.endsWith(".vue") ? [path] : []

  })

const pages = pageFiles(PAGES_DIR).map((path) => [path.slice(PAGES_DIR.length + 1), readFileSync(path, "utf8")] as const)

describe("page SEO", () => {

  it("finds the pages to check", () => {

    expect(pages.length).toBeGreaterThan(0)

  })

  it.each(pages)("%s declares a title and description", (_name, source) => {

    expect(source).toContain("useSeoMeta(")
    expect(source).toMatch(/^\s+title:/m)
    expect(source).toMatch(/^\s+description:/m)

  })

  it.each(pages)("%s leaves the brand suffix to titleTemplate", (_name, source) => {

    const title = source.match(/^\s+title: (.+)$/m)?.[1] ?? ""

    expect(title).not.toContain("The Crafted Tale")

  })

  it.each(pages)("%s no longer hand-rolls JSON-LD", (_name, source) => {

    // Structured data goes through `useSchemaOrg`, so the graph stays
    // de-duplicated against the site-wide identity in nuxt.config.ts.
    expect(source).not.toContain("application/ld+json")

  })

})
