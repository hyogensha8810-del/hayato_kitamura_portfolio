// 筆名（ペルソナ）定義
// 商材の対象性別と筆名を合わせることで、読者の納得感を上げる。
//
// 【厳守】未使用商品で「私が使ってみた」と書かない。
// ステマ規制（景表法・2023年10月施行）により体験談の捏造は不当表示にあたり得る。
// 筆名は「視点と語り口を一貫させる装置」であって、体験の捏造の道具ではない。

export type AuthorId = 'ryo' | 'akari' | 'editors';

export interface Author {
  id: AuthorId;
  name: string;
  role: string;
  bio: string;
}

export const AUTHORS: Record<AuthorId, Author> = {
  ryo: {
    id: 'ryo',
    name: 'リョウ',
    role: '編集部',
    bio: '30代・パートナーと交際中。買う前に迷ったこと、調べて分かったことを書いています。',
  },
  akari: {
    id: 'akari',
    name: 'あかり',
    role: '編集部',
    bio: '20代・パートナーと同棲中。女性の視点から、選び方と気になることをまとめています。',
  },
  editors: {
    id: 'editors',
    name: 'ほのかログ編集部',
    role: '編集部',
    bio: '複数名で運営しています。',
  },
};

export function getAuthor(id?: string): Author {
  if (id && id in AUTHORS) return AUTHORS[id as AuthorId];
  return AUTHORS.editors;
}
