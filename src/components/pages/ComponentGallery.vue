<template>
  <div class="component-gallery">
    <h1>コンポーネントギャラリー</h1>

    <!-- Atoms -->
    <section class="gallery-section">
      <h2>Atoms</h2>

      <!-- ボタン -->
      <div class="component-demo">
        <h3>BaseButton</h3>
        <div class="demo-area">
          <BaseButton>Default</BaseButton>
          <BaseButton variant="secondary">Secondary</BaseButton>
          <BaseButton variant="ghost">Ghost</BaseButton>
          <BaseButton variant="danger">Danger</BaseButton>
          <BaseButton disabled>Disabled</BaseButton>
          <BaseButton :loading="true">Loading</BaseButton>
        </div>
      </div>

      <!-- インプット -->
      <div class="component-demo">
        <h3>BaseInput</h3>
        <div class="demo-area" style="max-width: 400px">
          <BaseInput v-model="inputDemo" label="通常のインプット" />
          <BaseInput v-model="inputDemo2" label="エラー付き" error="エラーメッセージ" />
          <BaseInput v-model="inputDemo3" label="ヒント付き" hint="入力のヒント" />
        </div>
      </div>

      <!-- タグ -->
      <div class="component-demo">
        <h3>BaseTag</h3>
        <div class="demo-area">
          <BaseTag>Default</BaseTag>
          <BaseTag variant="primary">Primary</BaseTag>
          <BaseTag variant="success">Success</BaseTag>
          <BaseTag variant="warning">Warning</BaseTag>
          <BaseTag variant="danger">Danger</BaseTag>
          <BaseTag variant="info">Info</BaseTag>
          <BaseTag removable @remove="handleRemove">Removable</BaseTag>
          <BaseTag clickable @click="handleTagClick">Clickable</BaseTag>
        </div>
      </div>

      <!-- アバター -->
      <div class="component-demo">
        <h3>BaseAvatar</h3>
        <div class="demo-area">
          <!-- 画像あり -->
          <BaseAvatar src="https://via.placeholder.com/150" alt="User avatar" />

          <!-- 名前からイニシャル生成 -->
          <BaseAvatar name="山田 太郎" />
          <BaseAvatar name="Tanaka" variant="square" />

          <!-- サイズバリエーション -->
          <BaseAvatar name="S" size="small" />
          <BaseAvatar name="M" size="medium" />
          <BaseAvatar name="L" size="large" />
          <BaseAvatar name="XL" size="xlarge" />

          <!-- ステータス付き -->
          <BaseAvatar name="ON" status="online" />
          <BaseAvatar name="OFF" status="offline" />
          <BaseAvatar name="BUSY" status="busy" />
          <BaseAvatar name="AWAY" status="away" />

          <!-- クリック可能 -->
          <BaseAvatar name="Click" clickable @click="handleAvatarClick" />
        </div>
      </div>

      <!-- アイコン -->
      <div class="component-demo">
        <h3>BaseIcon</h3>
        <div class="demo-area">
          <!-- 基本的な使い方（絵文字） -->
          <BaseIcon icon="🏠" />
          <BaseIcon icon="💼" />
          <BaseIcon icon="📧" />
          <BaseIcon icon="⚙️" />

          <!-- サイズバリエーション -->
          <BaseIcon icon="⭐" size="small" />
          <BaseIcon icon="⭐" size="medium" />
          <BaseIcon icon="⭐" size="large" />
          <BaseIcon icon="⭐" size="xlarge" />

          <!-- カラー -->
          <BaseIcon icon="❤️" color="#ff0000" />
          <BaseIcon icon="💚" color="#00ff00" />
          <BaseIcon icon="💙" color="#0000ff" />

          <!-- 回転 -->
          <BaseIcon icon="⟳" spin />

          <!-- クリック可能 -->
          <BaseIcon icon="👍" clickable size="large" @click="handleIconClick" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseTag from '../atoms/BaseTag.vue'
import BaseAvatar from '@/components/atoms/BaseAvatar.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'

const inputDemo = ref('')
const inputDemo2 = ref('')
const inputDemo3 = ref('')

const handleRemove = () => {
  console.log('Tag removed')
}

const handleTagClick = () => {
  console.log('Tag clicked')
}

const handleAvatarClick = () => {
  console.log('Avatar clicked')
}

const handleIconClick = () => {
  console.log('Icon clicked')
}
</script>

<style lang="scss" scoped>
.component-gallery {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-section {
  margin-bottom: 40px;

  h2 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
  }
}

.component-demo {
  margin-bottom: 30px;

  h3 {
    margin-bottom: 15px;
    color: #666;
  }
}

.demo-area {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>
