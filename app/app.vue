<template>
  <div class="app">
    <main class="waitlist">
      <img :src="logo" alt="The Crafted Tale" class="logo" />
      <div class="waitlist-card">
        <Transition name="card-swap" mode="out-in">
          <div v-if="success" key="success" class="success-card">
            <div class="success-icon" aria-hidden="true">✓</div>
            <h2 class="success-title">You're on the list</h2>
            <p class="success-msg">You are successfully added to waitlist, we'll reach out to you soon once our store opens.</p>
          </div>
          <div v-else key="form" class="form-wrap">
            <h1 class="waitlist-title">Join the Waitlist</h1>
            <p class="waitlist-subtitle">Be the first to know when we launch. We'll reach out via your preferred channel.</p>

            <form class="waitlist-form" @submit.prevent="handleSubmit">
              <div class="contact-type">
                <label class="radio-label">
                  <input
                    v-model="contactType"
                    type="radio"
                    name="contact"
                    value="email"
                    class="radio-input"
                  />
                  <span class="radio-custom">Email</span>
                </label>
                <label class="radio-label">
                  <input
                    v-model="contactType"
                    type="radio"
                    name="contact"
                    value="whatsapp"
                    class="radio-input"
                  />
                  <span class="radio-custom">WhatsApp</span>
                </label>
              </div>

              <div class="input-wrapper" v-if="contactType === 'email'">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="input"
                  :class="{ 'input-error': submitted && !isEmailValid }"
                  required
                />
                <p v-if="submitted && !isEmailValid" class="error-msg">{{ emailError }}</p>
              </div>

              <div class="input-wrapper" v-else>
                <input
                  v-model="whatsapp"
                  type="tel"
                  placeholder="Enter your WhatsApp number (e.g. +1 555 123 4567)"
                  class="input"
                  :class="{ 'input-error': submitted && !isWhatsAppValid }"
                />
                <p v-if="submitted && !isWhatsAppValid" class="error-msg">{{ whatsappError }}</p>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading">Join Waitlist</button>
              <p v-if="error" class="error-msg">{{ error }}</p>
            </form>
          </div>
        </Transition>
      </div>
      <SocialItems />
    </main>
  </div>
</template>

<script setup lang="ts">
import logo from './assets/images/logo.svg'

const contactType = ref<'email' | 'whatsapp'>('email')
const email = ref('')
const whatsapp = ref('')
const submitted = ref(false)
const success = ref(false)
const loading = ref(false)
const error = ref('')

// Email: non-empty, valid format (local@domain.tld)
const isEmailValid = computed(() => {
  const trimmed = email.value.trim()
  if (!trimmed) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
})

// WhatsApp: non-empty, exactly 10 digits (allows +, spaces, dashes, parentheses for formatting)
const isWhatsAppValid = computed(() => {
  const trimmed = whatsapp.value.trim()
  if (!trimmed) return false
  const digitsOnly = trimmed.replace(/\D/g, '')
  return digitsOnly.length === 10
})

const emailError = computed(() => {
  const trimmed = email.value.trim()
  if (!trimmed) return 'Please enter your email'
  return 'Please enter a valid email address'
})

const whatsappError = computed(() => {
  const trimmed = whatsapp.value.trim()
  if (!trimmed) return 'Please enter your WhatsApp number'
  const digitsOnly = trimmed.replace(/\D/g, '')
  if (digitsOnly.length !== 10) return 'Phone number must have exactly 10 digits'
  return 'Please enter a valid WhatsApp number'
})

async function handleSubmit() {
  submitted.value = true
  error.value = ''

  if (contactType.value === 'email') {
    if (!email.value.trim()) return
    if (!isEmailValid.value) return
  }

  if (contactType.value === 'whatsapp') {
    if (!whatsapp.value.trim()) return
    if (!isWhatsAppValid.value) return
  }

  loading.value = true
  try {
    const response = await $fetch('/api/waitlist', {
      method: 'POST',
      body: {
        channel: contactType.value,
        value: contactType.value === 'email' ? email.value.trim() : whatsapp.value.trim(),
      },
    })

    console.log(response)

    success.value = true
    submitted.value = false
    email.value = ''
    whatsapp.value = ''
  } catch (e: unknown) {
    const err = e as { data?: { message?: string }; statusMessage?: string }
    error.value = err.data?.message ?? err.statusMessage ?? 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Playfair Display", serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.waitlist {
  flex: 1;
  display: flex;
flex-direction: column;
gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(180deg, #fff5f6 0%, #ffeef1 50%, #fce7ea 100%);
}

.waitlist-card {
  width: 100%;
  max-width: 26rem;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
}

.waitlist-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.waitlist-subtitle {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 1.75rem;
}

.waitlist-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-type {
  display: flex;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  color: #374151;
  user-select: none;
}

img{
  height: 5rem;
}

.radio-input {
  width: 1rem;
  height: 1rem;
  accent-color: #c97b84;
}

.radio-custom {
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  color: #1f2937;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.input::placeholder {
  color: #9ca3af;
}

.input:hover {
  border-color: #d1d5db;
}

.input:focus {
  outline: none;
  border-color: #c97b84;
  box-shadow: 0 0 0 3px rgba(201, 123, 132, 0.2);
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.error-msg {
  font-size: 0.8125rem;
  color: #ef4444;
  margin: 0;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #c97b84 0%, #b86b74 100%);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s;
  margin-top: 0.25rem;
}

.submit-btn:hover {
  box-shadow: 0 4px 12px rgba(201, 123, 132, 0.4);
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-wrap {
  min-height: 12rem;
}

.success-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem 0;
  min-height: 14rem;
}

.success-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  flex-shrink: 0;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.success-msg {
  font-size: 0.9375rem;
  color: #059669;
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
  max-width: 22rem;
}

/* Card swap transition */
.card-swap-enter-active,
.card-swap-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.card-swap-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-8px);
}

.card-swap-enter-from {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}

@media (max-width: 480px) {
  .waitlist {
    padding: 1.5rem 1rem;
  }

  .waitlist-card {
    padding: 1.5rem;
  }

  .waitlist-title {
    font-size: 1.5rem;
  }

  .waitlist-subtitle {
    font-size: 0.875rem;
  }

  .contact-type {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
