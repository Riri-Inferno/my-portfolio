<template>
  <div class="component-gallery">
    <!-- トップページに戻るボタン（固定表示） -->
    <div class="back-to-top-button">
      <BaseButton
        variant="primary"
        @click="$router.push('/')"
        style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)"
      >
        <BaseIcon icon="🏠" /> トップページへ
      </BaseButton>
    </div>

    <h1><BaseIcon icon="🖼" size="large" /> コンポーネントギャラリー</h1>

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

      <div class="component-demo">
        <h3>BaseModal</h3>
        <div class="demo-area">
          <!-- 基本的なモーダル -->
          <BaseButton @click="showModal1 = true"> 基本モーダルを開く </BaseButton>

          <!-- サイズ違い -->
          <BaseButton variant="secondary" @click="showModal2 = true"> 小さいモーダル </BaseButton>

          <BaseButton variant="ghost" @click="showModal3 = true"> 大きいモーダル </BaseButton>

          <!-- フッター付き -->
          <BaseButton variant="danger" @click="showModal4 = true">
            フッター付きモーダル
          </BaseButton>
        </div>

        <!-- モーダル本体 -->
        <BaseModal v-model="showModal1" title="基本的なモーダル">
          <p>これは基本的なモーダルの内容です。</p>
          <p>ESCキーまたはオーバーレイクリックで閉じることができます。</p>
        </BaseModal>

        <BaseModal v-model="showModal2" title="小さいモーダル" size="small">
          <p>これは小さいサイズのモーダルです。</p>
        </BaseModal>

        <BaseModal v-model="showModal3" title="大きいモーダル" size="large">
          <p>これは大きいサイズのモーダルです。</p>
          <p>より多くのコンテンツを表示できます。</p>
          <BaseInput label="名前" v-model="modalInputDemo" />
        </BaseModal>

        <BaseModal v-model="showModal4" title="確認" :close-on-overlay="false">
          <p>本当に削除しますか？この操作は取り消せません。</p>
          <template #footer>
            <BaseButton variant="ghost" @click="showModal4 = false"> キャンセル </BaseButton>
            <BaseButton variant="danger" @click="showModal4 = false"> 削除する </BaseButton>
          </template>
        </BaseModal>
      </div>
    </section>

    <!-- Molecules -->
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

      <!-- スキルアイテム -->
      <div class="component-demo">
        <h3>SkillItem</h3>
        <div class="demo-area" style="flex-direction: column; align-items: stretch; gap: 16px">
          <!-- 基本的な使い方 -->
          <SkillItem name="Vue.js" icon="💚" level="advanced" experience="3年" />

          <!-- 説明付き -->
          <SkillItem
            name="TypeScript"
            icon="🔷"
            level="intermediate"
            experience="2年"
            description="型安全なJavaScriptの開発経験。Vue3のComposition APIと組み合わせて使用。"
          />

          <!-- サブスキル付き -->
          <SkillItem
            name="React"
            icon="⚛️"
            level="expert"
            experience="5年"
            description="大規模SPAの開発経験あり"
            :sub-skills="['Next.js', 'Redux', 'React Hook Form', 'Styled Components']"
          />

          <!-- カスタムプログレス -->
          <SkillItem
            name="Node.js"
            icon="🟢"
            experience="4年"
            :custom-progress="85"
            :sub-skills="['Express', 'NestJS', 'Prisma']"
          />
        </div>
      </div>

      <!-- 連絡先情報 -->
      <div class="component-demo">
        <h3>ContactInfo</h3>
        <div class="demo-area" style="flex-direction: column; align-items: stretch">
          <!-- 基本的な使い方 -->
          <ContactInfo
            title="連絡先"
            email="example@email.com"
            phone="090-1234-5678"
            location="東京都渋谷区"
          />

          <!-- ウェブサイト・SNS付き -->
          <ContactInfo
            email="developer@example.com"
            website="https://example.com"
            location="大阪府大阪市"
            :social-links="[
              { platform: 'GitHub', url: 'https://github.com/example', icon: '🐙' },
              { platform: 'Twitter', url: 'https://twitter.com/example', icon: '🐦' },
              { platform: 'LinkedIn', url: 'https://linkedin.com/in/example', icon: '💼' },
            ]"
          />

          <!-- エクストラコンテンツ付き -->
          <ContactInfo title="お問い合わせ" email="contact@example.com">
            <template #extra>
              <BaseButton variant="primary" full-width> お問い合わせフォームへ </BaseButton>
            </template>
          </ContactInfo>
        </div>
      </div>

      <!-- スワイプカード -->
      <div class="component-demo">
        <h3>SwipeCard</h3>
        <div class="demo-area" style="height: 400px; position: relative; overflow: hidden">
          <!-- 単体のスワイプカード -->
          <div style="position: relative; width: 300px; height: 350px; margin: 0 auto">
            <SwipeCard
              v-if="!singleCardSwiped"
              @swipe="handleSingleSwipe"
              @swiping="handleSwiping"
              @cancel="handleSwipeCancel"
              ref="singleSwipeCard"
            >
              <div
                style="
                  height: 100%;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 16px;
                  padding: 20px;
                  color: white;
                "
              >
                <BaseHeading tag="h3" style="color: white">スワイプしてみて！</BaseHeading>
                <p>左右にドラッグしてスワイプできます</p>
                <div style="margin-top: auto">
                  <p>👈 左: NOPE</p>
                  <p>👉 右: LIKE</p>
                </div>
              </div>
            </SwipeCard>

            <div v-else style="text-align: center; padding: 40px">
              <p>スワイプ方向: {{ lastSwipeDirection === 'left' ? '👈 NOPE' : '👉 LIKE' }}</p>
              <BaseButton @click="resetSingleCard" variant="primary" style="margin-top: 20px">
                もう一度
              </BaseButton>
            </div>
          </div>

          <!-- スワイプ進捗表示 -->
          <div v-if="swipeProgress > 0" style="text-align: center; margin-top: 20px">
            <BaseProgressBar :value="swipeProgress * 100" label="スワイプ進捗" show-value />
          </div>
        </div>
      </div>
    </section>

    <!-- Organisms-->
    <section class="gallery-section">
      <h2>Organisms</h2>

      <!-- スワイプカード -->
      <div class="component-demo">
        <h3>SwipeCard & SwipeableCardStack</h3>
        <div class="demo-area" style="height: 600px; position: relative">
          <SwipeableCardStack
            :cards="demoCards"
            @like="handleCardLike"
            @nope="handleCardNope"
            @superlike="handleCardSuperlike"
          >
            <template #default="{ card }">
              <div style="height: 100%; display: flex; flex-direction: column; padding: 20px">
                <BaseAvatar
                  :name="(card as DemoCard).name"
                  size="xlarge"
                  style="margin: 0 auto 20px"
                />
                <BaseHeading tag="h3" align="center">{{ (card as DemoCard).name }}</BaseHeading>
                <p style="text-align: center; color: #666">{{ (card as DemoCard).title }}</p>
                <BaseDivider />
                <p>{{ (card as DemoCard).bio }}</p>
                <div style="margin-top: auto; display: flex; gap: 8px; flex-wrap: wrap">
                  <BaseTag v-for="skill in (card as DemoCard).skills" :key="skill" size="small">
                    {{ skill }}
                  </BaseTag>
                </div>
              </div>
            </template>
            <template #empty>
              <div style="text-align: center; padding: 40px">
                <BaseIcon icon="🎊" size="xlarge" />
                <BaseHeading tag="h3">全てのカードを確認しました！</BaseHeading>
                <p>素晴らしいマッチングでした</p>
              </div>
            </template>
          </SwipeableCardStack>
        </div>
      </div>

      <!-- スワイプ可能なカードスタック -->
      <div class="component-demo">
        <h3>SwipeableCardStack</h3>

        <!-- 基本的な使い方 -->
        <div class="demo-area" style="flex-direction: column">
          <h4>基本的なカードスタック</h4>
          <div style="height: 600px; position: relative; background: #f5f5f5; border-radius: 8px">
            <SwipeableCardStack
              :cards="demoCards"
              :visible-count="3"
              @like="handleCardLike"
              @nope="handleCardNope"
              @superlike="handleCardSuperlike"
              @rewind="handleCardRewind"
            >
              <template #default="{ card }">
                <div
                  style="
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    background: white;
                  "
                >
                  <BaseAvatar
                    :name="(card as DemoCard).name"
                    size="xlarge"
                    style="margin: 0 auto 20px"
                  />
                  <BaseHeading tag="h3" align="center">{{ (card as DemoCard).name }}</BaseHeading>
                  <p style="text-align: center; color: #666">{{ (card as DemoCard).title }}</p>
                  <BaseDivider />
                  <p style="flex: 1">{{ (card as DemoCard).bio }}</p>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap">
                    <BaseTag
                      v-for="skill in (card as DemoCard).skills"
                      :key="skill"
                      size="small"
                      variant="primary"
                    >
                      {{ skill }}
                    </BaseTag>
                  </div>
                </div>
              </template>
              <template #empty>
                <div style="text-align: center; padding: 40px">
                  <BaseIcon icon="🎊" size="xlarge" />
                  <BaseHeading tag="h3">全てのカードを確認しました！</BaseHeading>
                  <p>素晴らしいマッチングでした</p>
                  <BaseButton @click="resetCards" variant="primary" style="margin-top: 20px">
                    最初から見る
                  </BaseButton>
                </div>
              </template>
            </SwipeableCardStack>
          </div>

          <!-- アクションログ -->
          <div style="margin-top: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px">
            <h4 style="margin-top: 0">アクションログ</h4>
            <div style="max-height: 100px; overflow-y: auto">
              <p
                v-for="(log, index) in actionLogs"
                :key="index"
                style="margin: 4px 0; font-size: 14px"
              >
                {{ log }}
              </p>
              <p v-if="actionLogs.length === 0" style="color: #999; font-size: 14px">
                カードをスワイプするとここにログが表示されます
              </p>
            </div>
          </div>
        </div>

        <!-- カスタマイズ例 -->
        <div class="demo-area" style="flex-direction: column; margin-top: 40px">
          <h4>アクションボタンなしバージョン</h4>
          <div style="height: 400px; position: relative; background: #f5f5f5; border-radius: 8px">
            <SwipeableCardStack
              :cards="miniCards"
              :visible-count="2"
              :show-actions="false"
              @swipe="handleMiniSwipe"
            >
              <template #default="{ card }">
                <div
                  style="
                    height: 100%;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    border-radius: 16px;
                    padding: 30px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <div style="text-align: center">
                    <BaseIcon
                      :icon="(card as DemoCard).icon"
                      size="xlarge"
                      style="margin-bottom: 16px"
                    />
                    <BaseHeading tag="h3" style="color: white">{{
                      (card as DemoCard).name
                    }}</BaseHeading>
                    <p>{{ (card as DemoCard).description }}</p>
                  </div>
                </div>
              </template>
            </SwipeableCardStack>
          </div>
        </div>
      </div>

      <!-- ログインフォーム -->
      <div class="component-demo">
        <h3>SecretLoginForm</h3>
        <div class="demo-area" style="background-color: #f5f5f5; padding: 40px">
          <!-- 基本的なログインフォーム -->
          <SecretLoginForm
            @submit="handleLoginSubmit"
            @success="handleLoginSuccess"
            @error="handleLoginError"
          />

          <!-- カスタマイズされたフォーム -->
          <SecretLoginForm
            title="採用担当者様専用"
            subtitle="詳細なプロフィールを閲覧するには認証が必要です"
            submit-text="アクセスする"
            :show-email-field="true"
            :show-hint="true"
            hint="パスワード: demo123"
            :max-attempts="3"
            style="margin-top: 40px"
          >
            <template #footer>
              <p style="margin: 0; font-size: 14px; color: #666">
                パスワードをお忘れの方は<a href="#" style="color: #007bff">こちら</a>
              </p>
            </template>
          </SecretLoginForm>
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
import BaseModal from '@/components/atoms/BaseModal.vue'
import SkillItem from '@/components/molecules/SkillItem.vue'
import ContactInfo from '@/components/molecules/ContactInfo.vue'
import SwipeCard from '@/components/molecules/SwipeCard.vue'
import SwipeableCardStack from '@/components/organisms/SwipeableCardStack.vue'
import SecretLoginForm from '@/components/organisms/SecretLoginForm.vue'
import type { BaseCard } from '@/components/organisms/SwipeableCardStack.vue'
import type { LoginFormData } from '@/components/organisms/SecretLoginForm.vue'

// デモ用のカード型
interface DemoCard extends BaseCard {
  name: string
  title?: string
  bio?: string
  skills?: string[]
  icon?: string
  description?: string
}

const inputDemo = ref('')

const inputDemo2 = ref('')
const inputDemo3 = ref('')

// モーダル用の状態
const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
const showModal4 = ref(false)
const modalInputDemo = ref('')

// SwipeCard用の状態
const singleCardSwiped = ref(false)
const lastSwipeDirection = ref<'left' | 'right'>('right')
const swipeProgress = ref(0)
const singleSwipeCard = ref()

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

const handleSwiping = (progress: number) => {
  swipeProgress.value = progress
}

const handleSwipeCancel = () => {
  swipeProgress.value = 0
  console.log('Swipe cancelled')
}

const resetSingleCard = () => {
  singleCardSwiped.value = false
  swipeProgress.value = 0
}

// SwipeCard用のハンドラー
const handleSingleSwipe = (direction: 'left' | 'right') => {
  singleCardSwiped.value = true
  lastSwipeDirection.value = direction
  swipeProgress.value = 0
}

// デモ用データ
const demoCards = ref<DemoCard[]>([
  {
    id: 1,
    name: 'Vue.js',
    title: 'Progressive Framework',
    bio: '段階的に採用可能なフレームワーク。あなたのプロジェクトに最適です。',
    skills: ['Reactive', 'Component-based', 'TypeScript'],
  },
  {
    id: 2,
    name: 'React',
    title: 'UI Library',
    bio: 'Facebookが開発した人気のUIライブラリ。大規模アプリケーションに最適。',
    skills: ['JSX', 'Virtual DOM', 'Hooks'],
  },
  {
    id: 3,
    name: 'Node.js',
    title: 'JavaScript Runtime',
    bio: 'サーバーサイドJavaScript。フルスタック開発を実現します。',
    skills: ['Async', 'NPM', 'Express'],
  },
  {
    id: 4,
    name: 'C#',
    title: 'King of Backend',
    bio: 'APIサーバーサイドの鉄板。初心者向け',
    skills: ['Async', 'NPM', 'Express'],
  },
  {
    id: 5,
    name: 'TypeScript',
    title: 'チーム開発向けのAltJS',
    bio: '理解している人たちで一緒に使えば最強の型付Jsです。理解しているならね。。。',
    skills: ['Async', 'NPM', 'Express'],
  },
])

// アクションログ
const actionLogs = ref<string[]>([])

// SwipeableCardStack用の追加データ
const miniCards = ref<DemoCard[]>([
  {
    id: 1,
    name: 'Design',
    icon: '🎨',
    description: 'Beautiful UI/UX',
  },
  {
    id: 2,
    name: 'Code',
    icon: '💻',
    description: 'Clean & Efficient',
  },
  {
    id: 3,
    name: 'Deploy',
    icon: '🚀',
    description: 'Fast & Reliable',
  },
])

// カードアクション
const handleCardLike = (card: BaseCard) => {
  const demoCard = card as DemoCard
  actionLogs.value.unshift(`💚 Liked: ${demoCard.name}`)
  if (actionLogs.value.length > 10) actionLogs.value.pop()
}

const handleCardNope = (card: BaseCard) => {
  const demoCard = card as DemoCard
  actionLogs.value.unshift(`❌ Noped: ${demoCard.name}`)
  if (actionLogs.value.length > 10) actionLogs.value.pop()
}

const handleCardSuperlike = (card: BaseCard) => {
  const demoCard = card as DemoCard
  actionLogs.value.unshift(`⭐ Superliked: ${demoCard.name}`)
  if (actionLogs.value.length > 10) actionLogs.value.pop()
}

const handleCardRewind = (card: BaseCard) => {
  const demoCard = card as DemoCard
  actionLogs.value.unshift(`↩️ Rewind: ${demoCard.name}`)
  if (actionLogs.value.length > 10) actionLogs.value.pop()
}

const handleMiniSwipe = (card: BaseCard, direction: 'left' | 'right') => {
  const demoCard = card as DemoCard
  console.log(`Mini card swiped ${direction}:`, demoCard.name)
}

// カードをリセット
const resetCards = () => {
  // SwipeableCardStackを再レンダリングするため、
  // 実際の実装では currentIndex をリセットする
  actionLogs.value = []
  window.location.reload() // 簡易的なリセット
}

// ログインフォーム
const handleLoginSubmit = (data: LoginFormData) => {
  console.log('Login attempt:', data)
}

const handleLoginSuccess = (data: LoginFormData) => {
  console.log('Login success:', data)
  alert('ログイン成功！')
}

const handleLoginError = (error: string) => {
  console.error('Login error:', error)
}
</script>

<style lang="scss" scoped>
.component-gallery {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
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

.back-to-top-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  // モバイル
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;

    // モバイルではボタンを少し小さくする
    :deep(.base-button) {
      padding: 8px 16px;
      font-size: 14px;
    }
  }
}
</style>
