<template>
  <div class="component-gallery">
    <h1><BaseIcon icon="⭐" size="large" />コンポーネントギャラリー</h1>

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
      <!-- バッジ -->
      <div class="component-demo">
        <h3>BaseBadge</h3>
        <div class="demo-area">
          <!-- スタンドアロン -->
          <BaseBadge :count="5" />
          <BaseBadge :count="42" />
          <BaseBadge :count="100" />
          <BaseBadge content="New" />

          <!-- アイコンに付ける -->
          <BaseBadge :count="3">
            <BaseIcon icon="📧" size="large" />
          </BaseBadge>

          <BaseBadge :count="12" variant="primary">
            <BaseIcon icon="🔔" size="large" />
          </BaseBadge>

          <!-- ドットバッジ -->
          <BaseBadge dot>
            <BaseIcon icon="💬" size="large" />
          </BaseBadge>

          <!-- 位置の変更 -->
          <BaseBadge :count="5" position="top-left">
            <BaseAvatar name="TL" size="small" />
          </BaseBadge>

          <BaseBadge :count="5" position="bottom-right">
            <BaseAvatar name="BR" size="small" />
          </BaseBadge>

          <!-- バリアント -->
          <BaseBadge :count="1" variant="success">
            <BaseIcon icon="✅" size="large" />
          </BaseBadge>

          <BaseBadge :count="99" variant="warning">
            <BaseIcon icon="⚠️" size="large" />
          </BaseBadge>
        </div>
      </div>

      <!-- プログレスバー -->
      <div class="component-demo">
        <h3>BaseProgressBar</h3>
        <div class="demo-area" style="flex-direction: column; align-items: stretch; gap: 20px">
          <!-- 基本的な使い方 -->
          <BaseProgressBar :value="30" />
          <BaseProgressBar :value="60" variant="success" />
          <BaseProgressBar :value="80" variant="warning" />

          <!-- ラベル付き -->
          <BaseProgressBar :value="45" label="スキルレベル" show-value />

          <!-- カスタム高さ -->
          <BaseProgressBar :value="70" :height="16" variant="info" show-value />

          <!-- ストライプ -->
          <BaseProgressBar :value="50" variant="primary" striped />

          <!-- アニメーション -->
          <BaseProgressBar :value="75" variant="danger" striped animated />

          <!-- フラクション表示 -->
          <BaseProgressBar
            :value="7"
            :max="10"
            label="タスク進捗"
            show-value
            value-format="fraction"
          />

          <!-- カスタムフォーマット -->
          <BaseProgressBar
            :value="2500"
            :max="5000"
            label="経験値"
            show-value
            :custom-format="(v, min, max) => `${v.toLocaleString()} / ${max.toLocaleString()} XP`"
          />
        </div>
      </div>

      <!-- 見出し -->
      <div class="component-demo">
        <h3>BaseHeading</h3>
        <div class="demo-area" style="flex-direction: column; align-items: stretch">
          <!-- 各見出しレベル -->
          <BaseHeading tag="h1">見出しレベル1</BaseHeading>
          <BaseHeading tag="h2">見出しレベル2</BaseHeading>
          <BaseHeading tag="h3">見出しレベル3</BaseHeading>
          <BaseHeading tag="h4">見出しレベル4</BaseHeading>
          <BaseHeading tag="h5">見出しレベル5</BaseHeading>
          <BaseHeading tag="h6">見出しレベル6</BaseHeading>

          <!-- サブタイトル付き -->
          <BaseHeading tag="h2" subtitle="This is a subtitle"> メインタイトル </BaseHeading>

          <!-- 中央揃え -->
          <BaseHeading tag="h3" align="center"> 中央揃えの見出し </BaseHeading>

          <!-- 大文字変換 -->
          <BaseHeading tag="h4" uppercase> Uppercase Heading </BaseHeading>

          <!-- マージンなし -->
          <BaseHeading tag="h3" no-margin> マージンなしの見出し </BaseHeading>
        </div>
      </div>

      <!-- 区切り線 -->
      <div class="component-demo">
        <h3>BaseDivider</h3>
        <div class="demo-area" style="flex-direction: column; align-items: stretch; gap: 0">
          <!-- 基本的な区切り線 -->
          <BaseDivider />

          <!-- テキスト付き -->
          <BaseDivider text="または" />

          <!-- 破線 -->
          <BaseDivider variant="dashed" />

          <!-- 点線 -->
          <BaseDivider variant="dotted" text="Section" />

          <!-- カスタムカラー -->
          <BaseDivider color="#007bff" :thickness="2" />

          <!-- テキスト位置 -->
          <BaseDivider text="左寄せ" text-position="left" />
          <BaseDivider text="中央" text-position="center" />
          <BaseDivider text="右寄せ" text-position="right" />

          <!-- カスタムスペーシング -->
          <BaseDivider :spacing="32" text="大きなスペース" />

          <!-- スロット使用 -->
          <BaseDivider>
            <BaseIcon icon="⭐" />
          </BaseDivider>

          <!-- 垂直方向（デモ用コンテナ内） -->
          <div style="display: flex; height: 100px; align-items: center; gap: 16px">
            <span>左側</span>
            <BaseDivider orientation="vertical" />
            <span>右側</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Molecules セクションを追加 -->
    <section class="gallery-section">
      <h2>Molecules</h2>

      <!-- プロフィールヘッダー -->
      <div class="component-demo">
        <h3>ProfileHeader</h3>
        <div class="demo-area" style="flex-direction: column; align-items: stretch">
          <!-- 基本的な使い方 -->
          <ProfileHeader
            name="山田 太郎"
            title="フルスタックエンジニア"
            location="東京, 日本"
            :age="28"
            avatar-url="https://via.placeholder.com/150"
          />

          <!-- タグ付き -->
          <ProfileHeader
            name="鈴木 花子"
            title="UI/UXデザイナー"
            location="大阪, 日本"
            :tags="['Figma', 'React', 'TypeScript']"
            status="online"
            verified
          />

          <!-- アクションボタン付き -->
          <ProfileHeader
            name="佐藤 次郎"
            title="バックエンドエンジニア"
            location="福岡, 日本"
            :age="32"
            :tags="['Node.js', 'Python', 'AWS']"
            status="busy"
          >
            <template #actions>
              <BaseButton size="small" variant="primary">フォロー</BaseButton>
              <BaseButton size="small" variant="ghost">メッセージ</BaseButton>
            </template>
          </ProfileHeader>

          <!-- エクストラコンテンツ付き -->
          <ProfileHeader
            name="田中 美咲"
            title="プロダクトマネージャー"
            location="名古屋, 日本"
            verified
          >
            <template #extra>
              <div style="text-align: right">
                <p style="margin: 0; color: #666; font-size: 14px">マッチ率</p>
                <p style="margin: 0; font-size: 32px; font-weight: bold; color: #28a745">85%</p>
              </div>
            </template>
          </ProfileHeader>
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
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseProgressBar from '@/components/atoms/BaseProgressBar.vue'
import BaseHeading from '@/components/atoms/BaseHeading.vue'
import BaseDivider from '@/components/atoms/BaseDivider.vue'
import ProfileHeader from '@/components/molecules/ProfileHeader.vue'

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
  gap: 40px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>
