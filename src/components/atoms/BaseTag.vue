<template>
  <span
    :class="[
      'tag',
      `tag--${variant}`,
      `tag--${size}`,
      {
        'tag--clickable': clickable,
        'tag--removable': removable,
      },
    ]"
    @click="handleClick"
  >
    <slot />
    <button v-if="removable" class="tag__remove" @click.stop="handleRemove" aria-label="Remove tag">
      ×
    </button>
  </span>
</template>

<script setup lang="ts">
interface TagProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  clickable?: boolean
  removable?: boolean
}

interface TagEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'remove', event: MouseEvent): void
}

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'medium',
  clickable: false,
  removable: false,
})

const emit = defineEmits<TagEmits>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const handleRemove = (event: MouseEvent) => {
  emit('remove', event)
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  user-select: none;

  // サイズ
  &--small {
    padding: 2px 8px;
    font-size: 12px;
  }

  &--medium {
    padding: 4px 12px;
    font-size: 14px;
  }

  &--large {
    padding: 6px 16px;
    font-size: 16px;
  }

  // バリアント
  &--default {
    background-color: #f0f0f0;
    color: #333;
  }

  &--primary {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  &--success {
    background-color: #e8f5e9;
    color: #388e3c;
  }

  &--warning {
    background-color: #fff3e0;
    color: #f57c00;
  }

  &--danger {
    background-color: #ffebee;
    color: #d32f2f;
  }

  &--info {
    background-color: #e1f5fe;
    color: #0288d1;
  }

  // 状態
  &--clickable {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  &--removable {
    padding-right: 8px;
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-left: 4px;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: inherit;
    opacity: 0.6;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
