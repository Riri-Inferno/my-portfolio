<template>
  <div class="landing-page">
    <!-- 工事中アイコン -->
    <BaseIcon icon="🚧" size="xlarge" style="margin-bottom: 20px" />

    <!-- タイトル部分 -->
    <BaseHeading tag="h1" align="center" subtitle="このサイトは現在開発中です">
      ポートフォリオサイト
    </BaseHeading>

    <BaseDivider style="margin: 40px 0" />

    <!-- プログレスバー -->
    <div style="width: 100%; max-width: 400px; margin-bottom: 40px">
      <BaseProgressBar :value="65" label="開発進捗" show-value variant="warning" striped animated />
    </div>

    <!-- ナビゲーション -->
    <nav class="navigation">
      <BaseButton @click="goToComponents" variant="primary" size="large">
        <BaseIcon icon="🎨" /> コンポーネントギャラリーへ
      </BaseButton>
    </nav>

    <!-- 開発中の機能リスト -->
    <div class="coming-soon">
      <BaseHeading tag="h3">今後追加予定の機能</BaseHeading>
      <div class="feature-list">
        <BaseTag variant="info" size="medium"> <BaseIcon icon="👤" /> 自己紹介ページ </BaseTag>
        <BaseTag variant="info" size="medium">
          <BaseIcon icon="💼" /> 実績・ポートフォリオ
        </BaseTag>
        <BaseTag variant="info" size="medium"> <BaseIcon icon="📝" /> ブログ </BaseTag>
        <BaseTag variant="info" size="medium"> <BaseIcon icon="📧" /> お問い合わせ </BaseTag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseDivider from '@/components/atoms/BaseDivider.vue'
import BaseProgressBar from '@/components/atoms/BaseProgressBar.vue'
import BaseTag from '../atoms/BaseTag.vue'

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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .navigation {
    display: flex;
    gap: 20px;
    margin-bottom: 60px;
  }

  .coming-soon {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;

    .feature-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
