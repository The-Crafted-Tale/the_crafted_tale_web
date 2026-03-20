<template>
  <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
    <AppInput label="Name" placeholder="Your name" v-model="form.name" :required="true" :error="errors.name" />

    <AppInput label="Email" type="email" placeholder="you@example.com" v-model="form.email" :error="errors.email" />

    <AppInput label="Phone" type="tel" placeholder="+91 98765 43210" v-model="form.phone" :error="errors.phone" />

    <div class="contact-form__message-wrap">
      <AppInput label="Message" type="textarea" placeholder="Tell us about what you're looking for..."
        v-model="form.message" :required="true" :error="errors.message" />
      <span :class="['contact-form__char-count', { 'contact-form__char-count--over': form.message.length > 500 }]">
        {{ form.message.length }} / 500
      </span>
    </div>

    <AppButton type="submit" size="lg" :loading="loading" :disabled="loading">
      Send Message
    </AppButton>
  </form>
</template>

<script setup lang="ts">
interface Props {
  prefillProduct?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [payload: { name: string; email: string; phone: string; message: string }]
}>()

const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: props.prefillProduct
    ? `Hi, I'm inquiring about ${props.prefillProduct}`
    : '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.message = ''
}

const validate = (): boolean => {
  clearErrors()
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    valid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    valid = false
  }

  if (!form.email.trim() && !form.phone.trim()) {
    const msg = 'Please provide at least an email or phone number'
    errors.email = msg
    errors.phone = msg
    valid = false
  }

  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    valid = false
  }

  if (form.phone.trim() && !/^\d{10}$/.test(form.phone.trim())) {
    errors.phone = 'Phone number must be exactly 10 digits'
    valid = false
  }

  if (form.message.length > 500) {
    errors.message = 'Message must be 500 characters or fewer'
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true
  try {
    emit('submit', {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    })
  } finally {
    loading.value = false
  }
}

defineExpose({ loading })
</script>

<style lang="scss" scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 32rem;

  &__message-wrap {
    display: flex;
    flex-direction: column;
  }

  &__char-count {
    align-self: flex-end;
    font-size: 0.75rem;
    color: $text-muted;
    margin-top: 0.25rem;

    &--over {
      color: $error;
      font-weight: 600;
    }
  }
}
</style>
