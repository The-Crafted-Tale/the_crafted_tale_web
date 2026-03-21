const CONTACT = {
  email: 'thecraftedtale.shop@gmail.com',
  phone: '+919494949494',
  phoneFormatted: '+91 94949 49494',

  instagram: 'https://www.instagram.com/thecraftedtale.shop/',
  instagramHandle: '@thecraftedtale.shop',
  facebook: 'https://www.facebook.com/thecraftedtale.shop',
  youtube: 'https://youtube.com/thecraftedtale.shop',

  get mailtoUrl() {
    return `mailto:${this.email}`
  },
  get telUrl() {
    return `tel:${this.phone}`
  },
  get whatsappUrl() {
    return `https://wa.me/${this.phone.replace('+', '')}`
  },
} as const

export function useContactInfo() {
  function whatsappUrlWithMessage(message: string) {
    return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`
  }

  return { ...CONTACT, whatsappUrlWithMessage }
}
