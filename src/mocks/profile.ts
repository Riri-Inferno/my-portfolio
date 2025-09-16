import type { UserProfile } from '@/types/profile'

export const mockUserProfile: UserProfile = {
  name: 'John Smith',
  title: 'バックエンド',
  location: '大阪, キタ',
  age: 28,
  avatarUrl: 'https://via.placeholder.com/150',
  tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
  status: 'online',
  verified: true,
  bio: [
    'こんにちは！フルスタック開発者のジョン・スミスです。テクノロジーへの情熱を持ち、常に新しい技術を学ぶことを楽しんでいます。',
    'これまで3年以上にわたり、スタートアップから大企業まで様々な環境でWebアプリケーション開発に携わってきました。特にユーザー体験を重視した開発を心がけており、美しく使いやすいインターフェースの実装を得意としています。',
    'チームワークを大切にし、アジャイル開発手法を用いてプロダクトの成功に貢献することを目指しています。新しい挑戦を常に求めており、技術的な課題解決に情熱を注いでいます。',
  ],
  skills: [
    {
      name: 'Frontend Development',
      icon: '🎨',
      level: 'expert',
      experience: '5年',
      description: 'モダンなフレームワークを使用したSPA開発のエキスパート',
      subSkills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      name: 'Backend Development',
      icon: '⚙️',
      level: 'advanced',
      experience: '4年',
      description: 'スケーラブルなAPIとマイクロサービスの設計・実装',
      subSkills: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis'],
    },
    {
      name: 'Cloud & DevOps',
      icon: '☁️',
      level: 'intermediate',
      experience: '3年',
      description: 'AWSを中心としたクラウドインフラの構築と運用',
      subSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    },
    {
      name: 'Mobile Development',
      icon: '📱',
      level: 'beginner',
      experience: '1年',
      description: 'React Nativeを使用したクロスプラットフォーム開発',
      subSkills: ['React Native', 'Expo'],
    },
  ],
  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2022年4月 - 現在',
      description:
        'リードエンジニアとして、新規プロダクトの技術選定から実装まで幅広く担当。チーム規模を2倍に拡大し、開発効率を40%向上させました。',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      period: '2020年1月 - 2022年3月',
      description:
        'ECプラットフォームの開発に従事。マイクロサービスアーキテクチャの導入により、システムの可用性を99.9%まで向上させました。',
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Labs',
      period: '2018年6月 - 2019年12月',
      description:
        'React.jsを使用したSPA開発を担当。UIコンポーネントライブラリの構築により、開発速度を大幅に改善しました。',
    },
  ],
  contact: {
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://johnsmith.dev',
    location: '大阪 キタ',
    socialLinks: [
      { platform: 'GitHub', url: '', icon: '🐙' },
      { platform: 'LinkedIn', url: '', icon: '💼' },
      { platform: 'Twitter', url: '', icon: '🐦' },
      { platform: 'Dev.to', url: '', icon: '📝' },
    ],
  },
  actions: [
    { label: 'ポートフォリオ', icon: '🎨', variant: 'primary' },
    { label: 'ブログ', icon: '📝', variant: 'secondary' },
    { label: 'CV ダウンロード', icon: '📄', variant: 'ghost' },
  ],
}
