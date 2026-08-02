#!/usr/bin/env python3
"""photos/gourmet/ と photos/sweets/ の中身から photos-gen.js を自動生成する。
   GitHub Actions（.github/workflows/optimize-images.yml）から呼ばれる。"""

import os

EXTS = ('.jpg', '.jpeg', '.png')


def collect(folder, label):
    d = os.path.join('photos', folder)
    if not os.path.isdir(d):
        return []
    names = sorted(f for f in os.listdir(d) if f.lower().endswith(EXTS))
    return [
        '    { src: "photos/%s/%s", alt: "HAYATO KITAMURA 作品｜%s %03d" }'
        % (folder, name, label, i)
        for i, name in enumerate(names, 1)
    ]


def block(items):
    return ('\n' + ',\n'.join(items) + '\n  ') if items else ''


gourmet = collect('gourmet', 'グルメ写真')
sweets = collect('sweets', 'スイーツ写真')

content = '''/* =========================================================
   ★ このファイルは自動生成されます。手で編集しないでください ★

   photos/gourmet/ と photos/sweets/ に写真を追加してコミットすると、
   GitHub Actions がこのファイルを自動で書き換えます。
   （写真を入れるだけでサイトのタブに反映されます）
   ========================================================= */

const SITE_PHOTOS_AUTO = {
  gourmet: [%s],
  sweets: [%s]
};
''' % (block(gourmet), block(sweets))

with open('photos-gen.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('gourmet: %d / sweets: %d' % (len(gourmet), len(sweets)))
