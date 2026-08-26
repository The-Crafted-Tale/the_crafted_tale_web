import { describe, expect, it } from "vitest"
import { imageUrls, isVideoUrl } from "../../app/utils/media"

const BUCKET = "https://project.supabase.co/storage/v1/object/public/product_images/velvet-bloom-keyrings"

describe("isVideoUrl", () => {

  it("spots the clips the studio uploads to the image bucket", () => {

    expect(isVideoUrl(`${BUCKET}/lavender_video.mp4`)).toBe(true)
    expect(isVideoUrl(`${BUCKET}/clip.WEBM`)).toBe(true)
    expect(isVideoUrl(`${BUCKET}/clip.mov`)).toBe(true)

  })

  it("leaves photography alone", () => {

    expect(isVideoUrl(`${BUCKET}/velvet_bloom_keyring_1.webp`)).toBe(false)
    expect(isVideoUrl(`${BUCKET}/lavender.jpg`)).toBe(false)

  })

  it("ignores a query string or fragment on the storage URL", () => {

    expect(isVideoUrl(`${BUCKET}/lavender_video.mp4?t=1`)).toBe(true)
    expect(isVideoUrl(`${BUCKET}/lavender.jpg?width=720`)).toBe(false)

  })

  it("does not mistake a dot in the path for an extension", () => {

    expect(isVideoUrl(`${BUCKET}/no-extension`)).toBe(false)

  })

})

describe("imageUrls", () => {

  it("keeps photography in studio order and drops the clips", () => {

    expect(imageUrls([
      `${BUCKET}/orange.jpg`,
      `${BUCKET}/lavender_video.mp4`,
      `${BUCKET}/lavender.jpg`,
    ])).toEqual([`${BUCKET}/orange.jpg`, `${BUCKET}/lavender.jpg`])

  })

  it("returns nothing for a product whose only media is a clip", () => {

    expect(imageUrls([`${BUCKET}/lavender_video.mp4`])).toEqual([])

  })

})
