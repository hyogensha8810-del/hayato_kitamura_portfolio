export const SITE = {
  name: 'ほのかログ',
  // ブラウザのタブ・履歴・ブックマークに残る文字列。
  // 覗き見されても内容が特定されない語に保つこと。
  tagline: '調べたこと、迷ったこと',
  description: '人には聞きにくい、性にまつわる小さな悩み。調べて、整理して、置いておく場所です。',
  url: 'https://honoka-log.com',
  lang: 'ja',
  contactEmail: 'REPLACE_ME@example.com', // ← 専用Gmailに差し替え
  // 編集画面から「GitHubで開く」ときに使う
  repo: 'hyogensha8810-del/honoka-log',
  branch: 'main',
} as const;

// カテゴリ = コンテンツの柱
// 記事が増えたら随時見直す。slugを変えるとURLが変わるので、
// 表示名（label）だけを変えるのが安全。
export const CATEGORIES = {
  worry:  { slug: 'worry',  label: '性の悩み',     lead: '人には聞きにくい、からだと気持ちのこと。' },
  buying: { slug: 'buying', label: 'ラブグッズ',   lead: '選び方と、買うときに気になること。' },
  couple: { slug: 'couple', label: 'ふたりのこと', lead: 'パートナーとの、伝え方と距離のこと。' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
