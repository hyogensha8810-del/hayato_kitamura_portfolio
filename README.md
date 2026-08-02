# HAYATO KITAMURA ポートフォリオサイト

グルメの"色気"フォトグラファー HAYATO KITAMURA のポートフォリオサイト。
GitHub Pages（無料）で公開する静的サイトです。

## フォルダ構成

```
hayato-portfolio/
├── index.html        トップ（スライドショー＋グリッドギャラリー）
├── about.html        自己紹介
├── awards.html       受賞歴
├── contact.html      問い合わせ（Formspreeフォーム）
├── photos.js         ★hero・galleryの写真管理はこのファイル★
├── photos-gen.js     自動生成（触らない）
├── sitemap.xml       検索エンジン用のページ一覧
├── photos/
│   ├── hero/         トップのスライドショー用（横長写真）
│   ├── gallery/      グリッドギャラリー用（縦横自由）
│   ├── gourmet/      ★GOURMETタブ用（入れるだけで自動反映）
│   ├── sweets/       ★SWEETSタブ用（入れるだけで自動反映）
│   └── profile.jpg   Aboutページのプロフィール写真
├── css/style.css     デザイン
└── js/main.js        動作（編集不要）
```

## 写真の差し替え方法

1. `photos/hero/` または `photos/gallery/` に写真ファイルを入れる
2. `photos.js` を開き、ファイル名を書き換える（行の追加・削除・並べ替えも自由）
3. 保存してGitHubにアップロードすれば反映

- **並び順** … `photos.js` の行の順番がそのまま表示順
- **hero** … 横長写真推奨（画面いっぱいに表示されます）
- **gallery** … 縦・横どちらでもOK。自動でグリッドに並びます

### 写真サイズは気にしなくてOK（自動リサイズ機能）

**大きいサイズのままアップして大丈夫です。** カメラやスマホで撮ったそのままの大きい写真をGitHubにアップすると、自動でウェブ用の適切なサイズに縮小・圧縮されます（`.github/workflows/optimize-images.yml`）。手作業でのリサイズは不要です。

- 自動縮小の目安：hero＝長辺2400px、gallery＝長辺1800px、profile＝1200px（超えた分だけ縮小、小さい写真はそのまま）
- アップ後、GitHubの「Actions」タブで処理状況を確認できます（数十秒〜数分で完了）
- 処理が終わると、縮小済みの写真が自動でリポジトリに反映されます
- ※ この機能は**公開（Public）リポジトリで無料**です。設定は不要で、アップするだけで動きます

## GOURMET / SWEETS タブに写真を追加する（photos.js の編集は不要）

トップページの Works には **ALL / GOURMET / SWEETS** のタブがあります。
このタブ用の写真は、**フォルダに入れるだけ**で自動反映されます。

1. GitHubのリポジトリで `photos/gourmet/`（または `photos/sweets/`）を開く
2. 右上の **Add file → Upload files** で写真をドラッグ＆ドロップ
3. 下の **Commit changes** を押す

これだけです。あとは自動で以下が行われます。

- 写真がウェブ用サイズ（長辺1800px）に縮小・圧縮される
- `photos-gen.js`（写真リスト）が自動で書き換わる
- 1〜3分でサイトに反映され、タブが表示される

### 覚えておくこと

- **写真が1枚も入っていないタブは表示されません。** グルメとスイーツの両方が空のうちは、タブ自体が出ずに今までどおりの見た目になります
- **ALLタブ** には gourmet + sweets + gallery の全部が並びます
- 並び順は**ファイル名の昇順**です。順番を決めたいときは `01_xxx.jpg` `02_xxx.jpg` のように頭に番号を付けてください
- 写真を消したいときは、GitHub上でそのファイルを削除するだけ（リストも自動で更新されます）
- `photos-gen.js` は自動生成ファイルなので、**手で編集しないでください**
- ファイル名は `sweets-parfait-yokohama.jpg` のように内容がわかる英数字にすると、Google画像検索で有利です

### グリッドの見え方

写真は縦横比そのままで、3〜4列のマソナリー（レンガ積み）状に並びます。
縦位置・横位置・正方形が混ざっていても、切り取られずにそのまま表示されます。

- PC（1200px超）… 4列
- ノートPC（〜1200px）… 3列
- タブレット・スマホ（〜900px）… 2列

## 検索エンジン対策（設定済み）

- Google Search Console 登録・所有権確認済み（`google32cd84ebab581abc.html` と index.html の meta タグ。**どちらも消さないでください**）
- `sitemap.xml` を送信済み。**ページを増やしたときは sitemap.xml にも追記**してください
- 全ページに canonical / description / OGP / Twitterカード / ファビコンを設定済み
- トップページに構造化データ（JSON-LD）を設定済み

## 公開前にやること（初回のみ）

1. **Formspree設定**（問い合わせフォーム用）
   - https://formspree.io で無料登録（hyogensha8810@gmail.com）
   - 「New Form」でフォームを作成し、フォームID（例: `xabcdefg`）を取得
   - `contact.html` 内の `YOUR_FORM_ID` を差し替え
2. **仮テキストの差し替え**
   - `about.html` … 自己紹介文・プロフィール写真（photos/profile.jpg）
   - `awards.html` … 受賞歴
3. **ダミー画像の差し替え**
   - `photos/hero/`・`photos/gallery/` の画像をご自身の写真に

## GitHub Pagesでの公開手順

1. GitHubで新しいリポジトリを作成（例: `hayato-portfolio`、Public）
2. このフォルダの中身をすべてアップロード
   （リポジトリページ → Add file → Upload files でドラッグ＆ドロップ可）
3. リポジトリの Settings → Pages → Branch を `main` / `(root)` にして Save
4. 数分後、`https://ユーザー名.github.io/hayato-portfolio/` で公開されます

以降の更新も「ファイルをアップロードして上書き」するだけで反映されます。
