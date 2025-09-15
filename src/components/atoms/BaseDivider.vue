<!-- src/components/atoms/BaseDivider.vue -->
<template>
  <div
    :class="[
      'divider',
      `divider--${variant}`,
      `divider--${orientation}`,
      {
        'divider--with-text': hasContent,
      },
    ]"
    :style="customStyle"
  >
    <span v-if="hasContent" class="divider__content">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface DividerProps {
  variant?: 'solid' | 'dashed' | 'dotted'
  orientation?: 'horizontal' | 'vertical'
  thickness?: number
  spacing?: number
  color?: string
  text?: string
  textPosition?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<DividerProps>(), {
  variant: 'solid',
  orientation: 'horizontal',
  thickness: 1,
  spacing: 16,
  textPosition: 'center',
})

const slots = useSlots()

const hasContent = computed(() => {
  return !!(slots.default || props.text)
})

const customStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.color) {
    styles['--divider-color'] = props.color
  }

  if (props.orientation === 'horizontal') {
    styles.margin = `${props.spacing}px 0`
    styles.height = `${props.thickness}px`
  } else {
    styles.margin = `0 ${props.spacing}px`
    styles.width = `${props.thickness}px`
  }

  if (props.textPosition && hasContent.value) {
    styles['--text-position'] =
      props.textPosition === 'left' ? '15%' : props.textPosition === 'right' ? '85%' : '50%'
  }

  return styles
})
</script>

<style lang="scss" scoped>
.divider {
  --divider-color: #e0e0e0;
  --text-position: 50%;

  position: relative;
  display: flex;
  align-items: center;

  // 水平方向
  &--horizontal {
    width: 100%;

    &::before {
      content: '';
      flex: 1;
      height: inherit;
      background-color: var(--divider-color);
    }

    &.divider--with-text {
      &::before {
        margin-right: 16px;
      }

      &::after {
        content: '';
        flex: 1;
        height: inherit;
        background-color: var(--divider-color);
        margin-left: 16px;
      }

      .divider__content {
        flex: none;
        padding: 0;
        position: relative;
        left: calc(var(--text-position) - 50%);
        transform: translateX(-50%);
      }
    }
  }

  // 垂直方向
  &--vertical {
    height: 100%;
    flex-direction: column;

    &::before {
      content: '';
      flex: 1;
      width: inherit;
      background-color: var(--divider-color);
    }

    &.divider--with-text {
      &::before {
        margin-bottom: 16px;
      }

      &::after {
        content: '';
        flex: 1;
        width: inherit;
        background-color: var(--divider-color);
        margin-top: 16px;
      }

      .divider__content {
        flex: none;
        padding: 0;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }
    }
  }

  // バリアント
  &--solid {
    &::before,
    &::after {
      border-style: solid;
    }
  }

  &--dashed {
    &::before,
    &::after {
      background: none !important;
      border-top: inherit;
      border-left: inherit;
      border-style: dashed;
      border-color: var(--divider-color);
    }
  }

  &--dotted {
    &::before,
    &::after {
      background: none !important;
      border-top: inherit;
      border-left: inherit;
      border-style: dotted;
      border-color: var(--divider-color);
    }
  }

  // テキストコンテンツ
  &__content {
    color: #666;
    font-size: 14px;
    white-space: nowrap;
    background-color: white;
    padding: 0 8px;
  }
}
</style>
