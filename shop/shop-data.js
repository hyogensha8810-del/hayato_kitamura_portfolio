/* =========================================================
   ★ SHOPの商品はこのファイルで管理します ★

   通常は「管理画面」(admin.html) から編集してください。
   保存ボタンを押すと、このファイルが自動で書き換わります。

   手で直接編集することもできます。その場合は下記のルールで。
   -------------------------------------------------------
   id        … 半角英数字。他とかぶらない名前。あとから変えない
   title     … 作品タイトル（お客様に表示されます）
   type      … 'photo' = 写真プリント / 'oil' = 油絵風ポスター
   kind      … 'print' = 都度印刷（サイズ選択あり）
                'framed' = 印刷済み・額付きの1点もの
   place     … 撮影地
   year      … 撮影年
   desc      … 作品説明（2〜3行）
   images    … 1枚目=作品本体、2枚目以降=飾った様子
   prices    … サイズ別の価格（送料込み）。null にするとそのサイズは選べません
   status    … 'public' = 公開 / 'draft' = 下書き（一覧に出ません）

   ▼ kind が 'framed' のときだけ使う項目
   fixedSize   … 'a2' などサイズを固定
   framedPrice … 額付きの価格（送料込み）
   stock       … 1 なら販売中、0 なら SOLD OUT
   ========================================================= */

window.SHOP_DATA = {

  /* ---- サイズの定義（通常は変更不要） ---- */
  sizes: [
    { key: 'postcard', label: 'ハガキ', mm: '100×148mm', use: '卓上・ギフト',   band: 'small' },
    { key: 'a5',       label: 'A5',     mm: '148×210mm', use: '卓上フレーム',   band: 'small' },
    { key: 'a4',       label: 'A4',     mm: '210×297mm', use: '棚上・書斎',     band: 'small' },
    { key: 'a3',       label: 'A3',     mm: '297×420mm', use: '壁掛け（標準）', band: 'mid'   },
    { key: 'a2',       label: 'A2',     mm: '420×594mm', use: 'リビング主役',   band: 'mid'   },
    { key: 'a1',       label: 'A1',     mm: '594×841mm', use: '大型・空間演出', band: 'large' }
  ],

  /* ---- サイズ帯ごとの納期 ---- */
  lead: { small: '3〜5営業日', mid: '2〜3週間', large: '3〜4週間' },

  /* ---- 2枚目以降のお値引き額（まとめて1梱包で発送するため） ---- */
  repeatDiscount: { small: 500, mid: 1500, large: 2000 },

  /* ---- 価格に含めている送料の目安（管理画面での参考表示に使用） ---- */
  shippingIncluded: { small: 600, mid: 1800, large: 2300 },

  /* ---- 注文の送信先（Formspree のフォームID） ----
     ※ 問い合わせ用(mojgejdv)とは別に、SHOP注文専用のフォームを作って
        そのIDに差し替えてください。手順書に画面付きで書いてあります。 */
  formspreeId: 'mykrapal',

  /* ---- 作品一覧 ---- */
  products: [
    {
      id: "wms8kqd1t", title: "LUXURY.", type: "photo", kind: "print",
      place: "yokohama", year: "2024", status: "public",
      desc: "ある会員制スイーツバーにて。\nブルーのトランクから出てきたのは、真っ赤に輝く宝石たち･･･。\n各々が放つ光に魅了された午後、アフタヌーンティー。\n\nお部屋に飾られる場合、写真はA1サイズ以上の大きさでその存在感を発揮します。\nこの作品は製作者の個展会場にて”特別展示作品”として、くすみ系ゴールドのフレームに入れられて展示されました。\n\n個展内では多くの方に囲まれ記念写真を撮影するなど、とても皆さまに愛された作品です。",
      images: [
        "../photos/shop/wms8kqd1t-main-ms8kuon8.jpg",
        "../photos/shop/wms8kqd1t-2-ms8kwhqt.jpg",
        "../photos/shop/wms8kqd1t-3-ms8kwq7p.jpg",
        "../photos/shop/wms8kqd1t-4-ms8kwwjg.jpg"
      ],
      prices: { postcard: 1200, a5: 3300, a4: 12800, a3: 33000, a2: 55000, a1: 88000 }
    },
    {
      id: "wms9m02x9", title: "甘さの究極。", type: "photo", kind: "print",
      place: "Tokyo", year: "2024", status: "public",
      desc: "あなたにとって、究極に癒されるときはどんなときですか？\n\n最高にみずみずしい最高級の桃が美しく花開く。\nその奥にあるものを知りたい･･･。\n\n理性が飛び、無心で手をのばすワクワク感。\nそんな瞬間を撮影しました。\n\n個展ではマット系のブラックフレームに入れて展示。\n神秘的でふしぎな輝きをはなつ、魔力ある１点です。",
      images: [
        "../photos/shop/wms9m02x9-main-ms9m13sh.jpg",
        "../photos/shop/wms9m02x9-2-ms9m1xqd.jpg",
        "../photos/shop/wms9m02x9-3-ms9m290q.jpg",
        "../photos/shop/wms9m02x9-4-ms9m2eov.jpg"
      ],
      prices: { postcard: 1300, a5: 3300, a4: 12800, a3: 28000, a2: 55000, a1: null }
    },
    {
      id: "wms9mbjpg", title: "冷美。", type: "photo", kind: "print",
      place: "Tokyo", year: "2024", status: "public",
      desc: "暑い日でも、冷たい風の吹く日でも。\n冷たいアイスはそのときに合った美しいテイストで魅せてくれる。\n\n愛しい人とのひとときに、甘くて冷たいチョコレートのパフェをいただきました。\n\nふたりの時間のようにゆっくりと溶けだす甘いチョコアイスがとても美しく。。\nおもわずその溶ける姿にカメラを向けた１枚です。",
      images: [
        "../photos/shop/wms9mbjpg-main-ms9mce9c.jpg",
        "../photos/shop/wms9mbjpg-2-ms9mcqz7.jpg",
        "../photos/shop/wms9mbjpg-3-ms9mcycy.jpg",
        "../photos/shop/wms9mbjpg-4-ms9md689.jpg"
      ],
      prices: { postcard: 1300, a5: 3300, a4: 12800, a3: 28000, a2: 55000, a1: 88000 }
    },
    {
      id: "wms9mk4zr", title: "summer pink.", type: "photo", kind: "print",
      place: "Tokyo", year: "", status: "public",
      desc: "街中でふと見かけた、美しいひと。\nその立ち姿だけで、まるで世界が花に包まれたように煌めきだす。\n\n綺麗なスイーツに出会ったときもそう。\nパティシエの心が見えるそのアートは、空気をかえる。\nそしてそのスイーツに出会った人の心をつかんで離さない。\n\n出逢えただけで、とても幸せですね。",
      images: [
        "../photos/shop/wms9mk4zr-main-ms9mku24.jpg",
        "../photos/shop/wms9mk4zr-2-ms9mlcd0.jpg",
        "../photos/shop/wms9mk4zr-3-ms9mll06.jpg",
        "../photos/shop/wms9mk4zr-4-ms9mlqqp.jpg",
        "../photos/shop/wms9mk4zr-5-ms9mlufu.jpg"
      ],
      prices: { postcard: 1500, a5: 5500, a4: 13800, a3: 35000, a2: 58000, a1: null }
    },
    {
      id: "wms9ttqnv", title: "time melting.", type: "oil", kind: "print",
      place: "", year: "", status: "public",
      desc: "美しいものを目の当たりにしたとき、つい時が止まったように見惚れてしまうときがあります。\n\n私がこのパフェに出会ったとき、そのあまりの美しさにしばし眺めていました。\nそうすると上からだんだんと溶けだし、ゆっくりとグラスをつたいお皿にいたるまでアイスが流れたんです。\n\nそれを見た瞬間、そこに”色気”を感じました。\n\n美しくあるものが時間とともにくずれ落ちる姿。\nその儚さにこそまた美しさがあるのだと感じたのです。",
      images: [
        "../photos/shop/wms9ttqnv-main-ms9ttzu1.jpg"
      ],
      prices: { postcard: 1800, a5: 5500, a4: 15000, a3: 35000, a2: 58000, a1: 88000 }
    },
    {
      id: "wms9tze8s", title: "笑顔。", type: "oil", kind: "print",
      place: "", year: "", status: "public",
      desc: "真っ赤に光る表面が印象的なドーナツです。\n\nお皿におかれたそのドーナツは、笑顔でキラキラしているように見えました。\nただただ、自分を表現し、よけいなことは考えず、ひたすらに笑っているように見えたのです。\n\nこうした姿は人にもあてはまると感じます。\nその笑顔で、どれだけの人の心がすくわれるか。\nそんなことを感じながら描いたものです。",
      images: [
        "../photos/shop/wms9tze8s-main-ms9tzld4.jpg"
      ],
      prices: { postcard: 1800, a5: 5500, a4: 12800, a3: 28000, a2: 38000, a1: 88000 }
    },
    {
      id: "wms9uky13", title: "paris morning.", type: "oil", kind: "print",
      place: "", year: "", status: "public",
      desc: "",
      images: [
        "../photos/shop/wms9uky13-main-ms9ulduv.jpg"
      ],
      prices: { postcard: 2200, a5: 5500, a4: 13800, a3: 28000, a2: 58000, a1: 88000 }
    },
    {
      id: "wms9vcg19", title: "ribbon christmas cake.", type: "oil", kind: "print",
      place: "", year: "", status: "public",
      desc: "クリスマスの季節になると、街中が華やかになる。\nそこへさらに花をそえるのが、クリスマスケーキ。\n\n大きくて真っ赤なリボンが、まるでそれ自体がプレゼントであるかのように現れました。\n\nクリスマスのワクワク感、そして聖夜のはかないようなさみしいような、そしてどこかワクワクするような･･･\nそんな入り混じった気持ちで描きました。",
      images: [
        "../photos/shop/wms9vcg19-main-ms9vd0sd.jpg"
      ],
      prices: { postcard: 1800, a5: 5500, a4: 13800, a3: 33000, a2: 58000, a1: 88000 }
    },
    {
      id: "wms9vi47n", title: "おやつの時間。", type: "photo", kind: "print",
      place: "", year: "", status: "public",
      desc: "幼いころから「おやつの時間」が大好きでした。\nたまに買ってきてもらうドーナツは何だか特別な感じがしてワクワクしたものです。\n\n大人になった今でもたまに美味しいドーナツがある日はごきげんに。\nコーヒー片手にワクワクした気持ちで午後のおやつの時間を迎えます。\n\nそんなワクワクした気持ちで撮った１枚。",
      images: [
        "../photos/shop/wms9vi47n-main-ms9xpedu.jpg",
        "../photos/shop/wms9vi47n-2-ms9xsa2m.jpg",
        "../photos/shop/wms9vi47n-3-ms9xsmaw.jpg",
        "../photos/shop/wms9vi47n-4-ms9xsv8b.jpg"
      ],
      prices: { postcard: 1800, a5: 4500, a4: 7700, a3: 19800, a2: 28000, a1: 55000 }
    }
  ]
};
