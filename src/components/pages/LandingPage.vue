<template>
  <div class="landing-page">
    <h1>トップページ</h1>
    <nav class="navigation">
      <BaseButton @click="goToComponents"> コンポーネントギャラリーへ </BaseButton>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/atoms/BaseButton.vue'

const router = useRouter()

const goToComponents = () => {
  router.push('/components')
}
</script>

<style lang="scss" scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;

  h1 {
    margin-bottom: 40px;
    font-size: 48px;
    color: #333;
  }

  .navigation {
    display: flex;
    gap: 20px;
  }
}
</style>
