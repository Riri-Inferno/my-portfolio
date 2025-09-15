<template>
  <component
    :is="tag"
    :class="[
      'heading',
      `heading--${tag}`,
      `heading--${align}`,
      {
        'heading--no-margin': noMargin,
        'heading--uppercase': uppercase,
      },
    ]"
  >
    <slot />
    <span v-if="subtitle" class="heading__subtitle">
      {{ subtitle }}
    </span>
  </component>
</template>

<script setup lang="ts">
interface HeadingProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  align?: 'left' | 'center' | 'right'
  subtitle?: string
  noMargin?: boolean
  uppercase?: boolean
}

withDefaults(defineProps<HeadingProps>(), {
  tag: 'h2',
  align: 'left',
  noMargin: false,
  uppercase: false,
})
</script>

<style lang="scss" scoped>
.heading {
  font-weight: 700;
  line-height: 1.2;
  color: #333;

  // タグ別のスタイル
  &--h1 {
    font-size: 48px;
    margin: 32px 0 24px;
  }

  &--h2 {
    font-size: 36px;
    margin: 28px 0 20px;
  }

  &--h3 {
    font-size: 28px;
    margin: 24px 0 16px;
  }

  &--h4 {
    font-size: 24px;
    margin: 20px 0 12px;
  }

  &--h5 {
    font-size: 20px;
    margin: 16px 0 8px;
  }

  &--h6 {
    font-size: 16px;
    margin: 12px 0 8px;
  }

  // 配置
  &--left {
    text-align: left;
  }

  &--center {
    text-align: center;
  }

  &--right {
    text-align: right;
  }

  // マージンなし
  &--no-margin {
    margin: 0;
  }

  // 大文字
  &--uppercase {
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  // サブタイトル
  &__subtitle {
    display: block;
    margin-top: 8px;
    font-size: 0.6em;
    font-weight: 400;
    color: #666;
    text-transform: none;
    letter-spacing: normal;
  }
}
</style>
