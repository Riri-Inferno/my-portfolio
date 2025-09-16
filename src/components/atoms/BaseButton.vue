<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      {
        'button--disabled': disabled,
        'button--loading': loading,
        'button--full-width': fullWidth,
      },
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="button__loader">
      <!-- TODO:シンプルなローディング表示 -->
      /
    </span>
    <span class="button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'link'
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

// Props定義
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})

// Emit定義
const emit = defineEmits<ButtonEmits>()

// クリックハンドラー
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.button {
  // 基本スタイル
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  // サイズバリエーション
  &--small {
    padding: 6px 12px;
    font-size: 14px;
  }
  &--medium {
    padding: 10px 20px;
    font-size: 16px;
  }

  &--large {
    padding: 14px 28px;
    font-size: 18px;
  }

  // バリアントスタイル
  &--primary {
    background-color: #007bff;
    color: white;

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  }

  &--secondary {
    background-color: #6c757d;
    color: white;

    &:hover:not(:disabled) {
      background-color: #545b62;
    }
  }

  &--ghost {
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;

    &:hover:not(:disabled) {
      background-color: #007bff;
      color: white;
    }
  }

  &--danger {
    background-color: #dc3545;
    color: white;

    &:hover:not(:disabled) {
      background-color: #c82333;
    }
  }

  &--success {
    background-color: #00c72e;
    color: white;
    &:hover:not(:disabled) {
      background-color: #218838;
    }
  }

  &--warning {
    background-color: #ffc107;
    color: black;
    &:hover:not(:disabled) {
      background-color: #e0a800;
    }
  }

  &--link {
    background: none;
    color: #007bff;
    padding: 0;
    border-radius: 0;
    text-decoration: underline;
    &:hover:not(:disabled) {
      color: #0056b3;
    }
  }

  // 状態
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--loading {
    cursor: wait;
  }

  &--full-width {
    width: 100%;
  }

  // ローダー
  &__loader {
    animation: spin 1s linear infinite;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
