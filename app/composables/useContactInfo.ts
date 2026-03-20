const CONTACT = {
  email: 'thecraftedtale.shop@gmail.com',
  phone: '+919494521472',
  phoneFormatted: '+91 94945 21472',

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
