<template>
   <div>
      <PageHero label="OUR AGREEMENT" title="Terms of" accent="Service"
         description="Please read these terms carefully before using our website or placing an order with The Crafted Tale." />

      <LegalPageBody :last-updated="lastUpdated" :sections="sections" contact-icon="mdi:chat-question-outline"
         contact-title="Have questions about these terms?" />
   </div>
</template>

<script setup lang="ts">
import type { LegalSection } from '~/components/LegalPageBody.vue'

const termsDescription
  = 'Read the terms and conditions for using The Crafted Tale website and placing orders for our handmade gifts.'

useSeoMeta({
  title: 'Terms of Service',
  description: termsDescription,
})

defineOgImageComponent('Default', {
  title: 'Terms of Service',
  description: termsDescription,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Terms of Service', item: '/terms' },
    ],
  }),
  defineWebPage(),
])

const lastUpdated = 'March 20, 2026'

const sections: LegalSection[] = [
  {
    icon: 'mdi:file-document-outline',
    title: 'Overview',
    paragraphs: [
      'Welcome to The Crafted Tale. By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.',
      'The Crafted Tale is a handmade gifts business that creates bespoke, personalized products. These terms govern your use of our website and any orders or inquiries you place with us.',
    ],
  },
  {
    icon: 'mdi:shopping-outline',
    title: 'Products & Orders',
    paragraphs: [
      'All products displayed on our website are handmade and may vary slightly from the images shown. Minor variations in color, texture, or size are a natural part of the handcrafting process and add to the uniqueness of each piece.',
    ],
    list: [
      'Product images are representative; the final product may have slight handmade variations',
      'Prices listed are in Indian Rupees (INR) and are subject to change without prior notice',
      'Placing an inquiry or order does not guarantee availability — we will confirm via WhatsApp or email',
      'Custom and semi-custom orders require discussion and approval of the design before production begins',
    ],
  },
  {
    icon: 'mdi:hand-coin-outline',
    title: 'Pricing & Payment',
    paragraphs: [
      'All prices are displayed in Indian Rupees (INR). Payment details and methods will be communicated during the order confirmation process. Currently, payment is handled offline through direct communication.',
      'For custom orders, the final price may differ from the estimate depending on the complexity and materials required. We will always confirm the price with you before proceeding.',
    ],
  },
  {
    icon: 'mdi:truck-delivery-outline',
    title: 'Shipping & Delivery',
    paragraphs: [
      'Since each product is handmade, delivery timelines vary depending on the complexity of the order. We will provide an estimated delivery timeline at the time of order confirmation.',
    ],
    list: [
      'Ready-made products are typically shipped within 3–5 business days',
      'Custom and semi-custom orders may take 7–15 business days depending on complexity',
      'Shipping charges, if applicable, will be communicated before order confirmation',
      'We take great care in packaging to ensure your gift arrives in perfect condition',
    ],
  },
  {
    icon: 'mdi:swap-horizontal',
    title: 'Cancellations & Returns',
    paragraphs: [
      'Due to the handmade and personalized nature of our products, our cancellation and return policies are as follows:',
    ],
    list: [
      'Ready-made products may be returned within 7 days of delivery if they arrive damaged or defective',
      'Custom and semi-custom orders cannot be cancelled once production has started',
      'If a product arrives damaged, please contact us within 48 hours with photos and we will arrange a replacement',
      'Refunds, when applicable, will be processed through the original payment method',
    ],
  },
  {
    icon: 'mdi:creative-commons',
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website — including product designs, images, text, logos, and graphics — is the intellectual property of The Crafted Tale and is protected by applicable laws. You may not reproduce, distribute, or use any content from this website without our prior written consent.',
      'Product photos shared on our website and social media are of our original work. If you wish to share them, please credit The Crafted Tale appropriately.',
    ],
  },
  {
    icon: 'mdi:web',
    title: 'Website Use',
    paragraphs: [
      'You agree to use our website only for lawful purposes. You must not use our site in any way that could damage, disable, or impair the site or interfere with any other party\'s use of the site.',
    ],
    list: [
      'You must not attempt to gain unauthorized access to any part of the website',
      'You must not use the website to transmit any harmful or malicious content',
      'We reserve the right to restrict access to parts of the website at our discretion',
    ],
  },
  {
    icon: 'mdi:shield-alert-outline',
    title: 'Limitation of Liability',
    paragraphs: [
      'The Crafted Tale provides this website and its content on an "as is" basis. While we strive to keep information accurate and up to date, we make no warranties about the completeness, reliability, or accuracy of the information.',
      'To the maximum extent permitted by law, The Crafted Tale shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.',
    ],
  },
  {
    icon: 'mdi:update',
    title: 'Changes to These Terms',
    paragraphs: [
      'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes acceptance of the updated terms.',
      'We encourage you to review this page periodically to stay informed.',
    ],
  },
]
</script>
