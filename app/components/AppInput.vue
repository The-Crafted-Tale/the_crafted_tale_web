<template>
  <div class="app-input">
    <label v-if="label" :for="uid" class="app-input__label">
      {{ label }}
    </label>

    <textarea v-if="type === 'textarea'" :id="uid" :value="modelValue" :placeholder="placeholder" :required="required"
      :aria-invalid="!!error || undefined" :aria-describedby="error ? `${uid}-error` : undefined"
      :class="['app-input__field', 'app-input__field--textarea', { 'app-input__field--error': error }]" rows="4"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />

    <input v-else :id="uid" :type="type" :value="modelValue" :placeholder="placeholder" :required="required"
      :aria-invalid="!!error || undefined" :aria-describedby="error ? `${uid}-error` : undefined"
      :class="['app-input__field', { 'app-input__field--error': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <p v-if="error" :id="`${uid}-error`" role="alert" class="app-input__error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  type?: "text" | "email" | "tel" | "textarea"
  modelValue?: string
  placeholder?: string
  required?: boolean
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: "text",
  modelValue: "",
  required: false,
  label: undefined,
  placeholder: undefined,
  error: undefined,
})

defineEmits<{
  "update:modelValue": [value: string]
}>()

const uid = useId()
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__label {
    font-size: 0.875rem;
    font-weight: 600;
    color: $text-secondary;
  }

  &__field {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: $font-body;
    font-size: 1rem;
    color: $text-primary;
    background: #fff;
    border: 0.0625rem solid $border;
    border-radius: 0.5rem;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &::placeholder {
      color: $text-placeholder;
    }

    &:hover {
      border-color: $border-hover;
    }

    &:focus {
      outline: none;
      border-color: $brand-red;
      box-shadow: 0 0 0 0.1875rem rgba($brand-red, 0.2);
    }

    &--textarea {
      resize: vertical;
      min-height: 6rem;
    }

    &--error {
      border-color: $error;

      &:focus {
        box-shadow: 0 0 0 0.1875rem rgba($error, 0.2);
      }
    }
  }

  &__error {
    font-size: 0.8125rem;
    color: $error;
    margin: 0;
  }
}
</style>
