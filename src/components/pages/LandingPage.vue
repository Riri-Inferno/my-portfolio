<template>
  <h1>トップページ(作業中)</h1>
  <BaseButton :loading="isLoading" @click="handleClick">Click me</BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'
import { ref } from 'vue'

const isLoading = ref(false)

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
