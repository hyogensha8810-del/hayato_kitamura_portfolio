/* =========================================================
   ★ 写真の差し替えはこのファイルだけ編集すればOK ★

   ■ 写真を差し替える
     photos/hero/ や photos/gallery/ フォルダに写真を入れ、
     下のリストのファイル名を書き換える。

   ■ 並び順を変える
     行を上下に入れ替えるだけ。上にある写真が先に表示される。

   ■ 写真を増やす・減らす
     行をコピーして追加、または行を削除。

   ※ hero は横長写真（トップのスライドショー用）
   ※ gallery は縦横どちらでもOK（自動でグリッドに並ぶ）
   ========================================================= */

const SITE_PHOTOS = {

  /* --- トップのスライドショー（横長写真） --- */
  hero: [
    { src: "photos/hero/_65A2451-1.jpg", alt: "スイーツ写真" },
    { src: "photos/hero/_V5A2029-1.jpg", alt: "グルメ写真" },
    { src: "photos/hero/_V5A7737-1.jpg", alt: "スイーツ写真" },
  ],

  /* --- グリッドギャラリー（縦横バラバラでOK） --- */
  gallery: [
    { src: "photos/gallery/g-01.jpg", alt: "作品" },
    { src: "photos/gallery/g-02.jpg", alt: "作品" },
    { src: "photos/gallery/g-03.jpg", alt: "作品" },
    { src: "photos/gallery/g-04.jpg", alt: "作品" },
    { src: "photos/gallery/g-05.jpg", alt: "作品" },
    { src: "photos/gallery/g-06.jpg", alt: "作品" },
    { src: "photos/gallery/g-07.jpg", alt: "作品" },
    { src: "photos/gallery/g-08.jpg", alt: "作品" },
    { src: "photos/gallery/g-09.jpg", alt: "作品" },
    { src: "photos/gallery/g-10.jpg", alt: "作品" },
    { src: "photos/gallery/g-11.jpg", alt: "作品" },
    { src: "photos/gallery/g-12.jpg", alt: "作品" },
  ],

};
