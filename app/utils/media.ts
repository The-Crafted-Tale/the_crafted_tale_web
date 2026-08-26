/**
 * File extensions the studio uploads to the `product_images` bucket that are
 * video rather than photography. The bucket is named for images, but product
 * arrays carry the occasional clip (see `velvet-bloom-keyring`), and those must
 * never reach NuxtImg — the image optimizer answers an `.mp4` with a 400
 * IPX_INVALID_IMAGE and the gallery falls back to the placeholder.
 */
const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "m4v", "ogv"]

/** True when a product media URL points at a video file. */
export const isVideoUrl = (url: string): boolean => {

  const path = url.split(/[?#]/)[0] ?? ""

  const extension = path.slice(path.lastIndexOf(".") + 1).toLowerCase()

  return VIDEO_EXTENSIONS.includes(extension)

}

/**
 * The photography subset of a product's media, for the places that accept only
 * images: `og:image`, `twitter:image`, and the schema.org `Product.image` array
 * Google validates.
 */
export const imageUrls = (media: string[]): string[] => media.filter((url) => !isVideoUrl(url))
