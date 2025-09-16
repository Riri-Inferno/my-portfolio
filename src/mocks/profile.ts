import type { UserProfile } from '@/types/profile'

export const mockUserProfile: UserProfile = {
  name: 'りり',
  title: 'フロントエンド',
  location: '大阪, キタ',
  age: 23,
  avatarUrl: 'https://via.placeholder.com/150',
  tags: ['React', 'TypeScript', 'CSS'],
  status: 'online',
  verified: false,
  bio: [
    'はじめまして、りりです。Webフロントエンドの開発に関わっています。',
    '個人で小規模なアプリを作ったり、勉強会に参加しながらスキルアップを続けています。',
    'まだ経験は浅いですが、UIを工夫して分かりやすくすることに興味があります。',
  ],
  skills: [
    {
      name: 'Frontend Development',
      icon: '🎨',
      level: 'beginner',
      experience: '1年',
      description: 'Reactを中心に学習・開発経験あり',
      subSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      name: 'Design Basics',
      icon: '🖌️',
      level: 'beginner',
      experience: '半年',
      description: 'Figmaでの簡単なUI設計やプロトタイピング',
      subSkills: ['Figma', 'UI/UX 基礎'],
    },
  ],
  experience: [
    {
      title: 'Frontend Intern',
      company: 'スタートアップ企業 (インターン)',
      period: '2024年4月 - 2024年9月',
      description:
        '小規模なReactプロジェクトでUIの実装を担当。コンポーネント分割やスタイル調整を行いました。',
    },
  ],
  contact: {
    email: 'lily@example.com',
    phone: '',
    website: '',
    location: '大阪 キタ',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/example', icon: '🐙' },
      { platform: 'Twitter', url: '', icon: '🐦' },
    ],
  },
  actions: [
    { label: 'ポートフォリオ', icon: '🎨', variant: 'primary' },
    { label: 'GitHub', icon: '🐙', variant: 'secondary' },
  ],
}
