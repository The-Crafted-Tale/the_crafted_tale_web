<template>
  <div>
    <PageHero label="YOUR PRIVACY MATTERS" title="Privacy" accent="Policy"
      description="We value your trust and are committed to protecting the personal information you share with us." />

    <LegalPageBody :last-updated="lastUpdated" :sections="sections" contact-icon="mdi:email-heart-outline"
      contact-title="Questions about your privacy?" />
  </div>
</template>

<script setup lang="ts">
import type { LegalSection } from '~/components/LegalPageBody.vue'

const url = useRequestURL()

useSeoMeta({
  title: 'Privacy Policy | The Crafted Tale',
  description:
    'Learn how The Crafted Tale collects, uses, and protects your personal information when you visit our website.',
  ogTitle: 'Privacy Policy | The Crafted Tale',
  ogDescription:
    'Learn how The Crafted Tale collects, uses, and protects your personal information when you visit our website.',
  ogUrl: url.href,
  twitterTitle: 'Privacy Policy | The Crafted Tale',
  twitterDescription:
    'Learn how The Crafted Tale collects, uses, and protects your personal information when you visit our website.',
})

const lastUpdated = 'March 20, 2026'

const sections: LegalSection[] = [
  {
    icon: 'mdi:database-outline',
    title: 'Information We Collect',
    paragraphs: [
      'When you interact with The Crafted Tale, we may collect information that you voluntarily provide to us. This includes details you share through our contact form, newsletter signup, or WhatsApp conversations.',
    ],
    list: [
      'Name, email address, and phone number when you submit a contact form or inquiry',
      'Email address when you subscribe to our newsletter',
      'Product preferences and customization details when you place a custom order request',
      'Messages and communication history from inquiries',
    ],
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'How We Use Your Information',
    paragraphs: [
      'We use the information we collect solely to serve you better and operate our business. We do not sell, rent, or trade your personal information to third parties.',
    ],
    list: [
      'Responding to your inquiries and order requests',
      'Sending updates about your orders or custom creations',
      'Delivering our newsletter if you have opted in',
      'Improving our website and the products we offer',
    ],
  },
  {
    icon: 'mdi:cookie-outline',
    title: 'Cookies & Analytics',
    paragraphs: [
      'Our website may use essential cookies to ensure basic functionality. We do not use advertising cookies or invasive tracking technologies.',
      'We may use privacy-friendly analytics to understand how visitors use our site, helping us improve your experience. This data is aggregated and does not identify you personally.',
    ],
  },
  {
    icon: 'mdi:share-variant-outline',
    title: 'Third-Party Services',
    paragraphs: [
      'We use a limited number of trusted third-party services to operate our website and communicate with you.',
    ],
    list: [
      'Supabase — for securely storing contact form submissions and newsletter signups',
      'WhatsApp (Meta) — when you choose to message us directly via WhatsApp',
      'Instagram (Meta) — our social media presence where we share our work',
    ],
  },
  {
    icon: 'mdi:lock-outline',
    title: 'Data Security',
    paragraphs: [
      'We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. Our data is stored in secure, encrypted databases. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    icon: 'mdi:account-check-outline',
    title: 'Your Rights',
    paragraphs: [
      'You have the right to access, correct, or request deletion of any personal information we hold about you. If you wish to unsubscribe from our newsletter, you can do so at any time using the link in the email or by contacting us directly.',
      'To exercise any of these rights, simply reach out to us via email or our contact form.',
    ],
  },
  {
    icon: 'mdi:update',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this page periodically.',
    ],
  },
]
</script>
