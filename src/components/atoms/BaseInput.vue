<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>

    <div class="input-container">
      <span v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="[
          'input',
          {
            'input--error': error,
            'input--disabled': disabled,
            'input--with-prefix': $slots.prefix,
            'input--with-suffix': $slots.suffix,
          },
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix" />
      </span>
    </div>

    <p v-if="error" class="input-error">
      {{ error }}
    </p>
    <p v-else-if="hint" class="input-hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface InputProps {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  hint?: string
}

interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

// propsを削除して、definePropsの戻り値を直接使わない
withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
})

const emit = defineEmits<InputEmits>()

// ユニークなIDを生成
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

// ref
const inputRef = ref<HTMLInputElement>()

// ハンドラー
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 外部からフォーカスできるように公開
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.input-required {
  color: #dc3545;
  margin-left: 2px;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;
}

.input {
  flex: 1;
  padding: 10px 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  background-color: white;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #007bff;
  }

  &--error {
    border-color: #dc3545;
  }

  &--disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--with-prefix {
    padding-left: 40px;
  }

  &--with-suffix {
    padding-right: 40px;
  }
}

.input-prefix,
.input-suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  color: #666;
}

.input-prefix {
  left: 0;
}

.input-suffix {
  right: 0;
}

.input-error,
.input-hint {
  font-size: 12px;
  margin: 0;
}

.input-error {
  color: #dc3545;
}

.input-hint {
  color: #666;
}
</style>
