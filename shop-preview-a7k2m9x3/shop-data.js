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
  "sizes": [
    {
      "key": "postcard",
      "label": "ハガキ",
      "mm": "100×148mm",
      "use": "卓上・ギフト",
      "band": "small"
    },
    {
      "key": "a5",
      "label": "A5",
      "mm": "148×210mm",
      "use": "卓上フレーム",
      "band": "small"
    },
    {
      "key": "a4",
      "label": "A4",
      "mm": "210×297mm",
      "use": "棚上・書斎",
      "band": "small"
    },
    {
      "key": "a3",
      "label": "A3",
      "mm": "297×420mm",
      "use": "壁掛け（標準）",
      "band": "mid"
    },
    {
      "key": "a2",
      "label": "A2",
      "mm": "420×594mm",
      "use": "リビング主役",
      "band": "mid"
    },
    {
      "key": "a1",
      "label": "A1",
      "mm": "594×841mm",
      "use": "大型・空間演出",
      "band": "large"
    }
  ],
  "lead": {
    "small": "3〜5営業日",
    "mid": "2〜3週間",
    "large": "3〜4週間"
  },
  "repeatDiscount": {
    "small": 500,
    "mid": 1500,
    "large": 2000
  },
  "shippingIncluded": {
    "small": 600,
    "mid": 1800,
    "large": 2300
  },
  "formspreeId": "mykrapal",
  "products": [
    {
      "id": "w1",
      "title": "朝霧の湖",
      "type": "photo",
      "kind": "print",
      "place": "長野県",
      "year": "2025",
      "status": "public",
      "desc": "夜明け前、湖面に霧が立ちこめる数分間だけ現れる景色です。三脚を立てて日の出を待ちました。",
      "images": [
        "../photos/shop/asagiri-no-mizuumi-main.jpg",
        "../photos/shop/asagiri-no-mizuumi-room1.jpg",
        "../photos/shop/asagiri-no-mizuumi-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w2",
      "title": "夕暮れの路地",
      "type": "oil",
      "kind": "print",
      "place": "ポルトガル・リスボン",
      "year": "2024",
      "status": "public",
      "desc": "坂道の街に灯りがともりはじめる時間。写真に油彩調の加工を施したポスターです。",
      "images": [
        "../photos/shop/yugure-no-roji-main.jpg",
        "../photos/shop/yugure-no-roji-room1.jpg",
        "../photos/shop/yugure-no-roji-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w3",
      "title": "窓辺の光",
      "type": "photo",
      "kind": "print",
      "place": "神奈川県",
      "year": "2025",
      "status": "public",
      "desc": "午前の光が部屋に差し込む、なんでもない時間を撮りました。",
      "images": [
        "../photos/shop/madobe-no-hikari-main.jpg",
        "../photos/shop/madobe-no-hikari-room1.jpg",
        "../photos/shop/madobe-no-hikari-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": null
      }
    },
    {
      "id": "w4",
      "title": "冬の並木",
      "type": "photo",
      "kind": "print",
      "place": "北海道",
      "year": "2023",
      "status": "public",
      "desc": "雪の朝、音が消えた並木道。モノトーンに近い階調が出ました。",
      "images": [
        "../photos/shop/fuyu-no-namiki-main.jpg",
        "../photos/shop/fuyu-no-namiki-room1.jpg",
        "../photos/shop/fuyu-no-namiki-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w5",
      "title": "海辺の朝",
      "type": "oil",
      "kind": "print",
      "place": "静岡県",
      "year": "2024",
      "status": "public",
      "desc": "朝焼けの桟橋。写真に油彩調の加工を施したポスターです。",
      "images": [
        "../photos/shop/umibe-no-asa-main.jpg",
        "../photos/shop/umibe-no-asa-room1.jpg",
        "../photos/shop/umibe-no-asa-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w6",
      "title": "静かな午後",
      "type": "photo",
      "kind": "print",
      "place": "京都府",
      "year": "2025",
      "status": "public",
      "desc": "西日が長く伸びる時間。色温度をそのまま残しています。",
      "images": [
        "../photos/shop/shizukana-gogo-main.jpg",
        "../photos/shop/shizukana-gogo-room1.jpg",
        "../photos/shop/shizukana-gogo-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w7",
      "title": "山あいの霧",
      "type": "photo",
      "kind": "print",
      "place": "岐阜県",
      "year": "2023",
      "status": "public",
      "desc": "谷筋に霧が流れ込む瞬間。奥行きが幾重にも重なりました。",
      "images": [
        "../photos/shop/yamaai-no-kiri-main.jpg",
        "../photos/shop/yamaai-no-kiri-room1.jpg",
        "../photos/shop/yamaai-no-kiri-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w8",
      "title": "石畳の記憶",
      "type": "oil",
      "kind": "print",
      "place": "チェコ・プラハ",
      "year": "2022",
      "status": "public",
      "desc": "雨上がりの旧市街。写真に油彩調の加工を施したポスターです。",
      "images": [
        "../photos/shop/ishidatami-no-kioku-main.jpg",
        "../photos/shop/ishidatami-no-kioku-room1.jpg",
        "../photos/shop/ishidatami-no-kioku-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w9",
      "title": "灯台と風",
      "type": "photo",
      "kind": "print",
      "place": "長崎県",
      "year": "2024",
      "status": "draft",
      "desc": "（下書き状態の作品です。公開に切り替えると一覧に並びます）",
      "images": [
        "../photos/shop/todai-to-kaze-main.jpg",
        "../photos/shop/todai-to-kaze-room1.jpg",
        "../photos/shop/todai-to-kaze-room2.jpg"
      ],
      "prices": {
        "postcard": 1800,
        "a5": 2500,
        "a4": 3800,
        "a3": 7500,
        "a2": 11000,
        "a1": 16500
      }
    },
    {
      "id": "w10",
      "title": "白樺の朝（額装済み・1点もの）",
      "type": "photo",
      "kind": "framed",
      "place": "長野県",
      "year": "2024",
      "status": "public",
      "desc": "A2サイズでプリントし、マット＋木製額に収めた1点ものです。額装の状態でお届けします。",
      "images": [
        "../photos/shop/shirakaba-no-asa-main.jpg",
        "../photos/shop/shirakaba-no-asa-framed.jpg",
        "../photos/shop/shirakaba-no-asa-room1.jpg"
      ],
      "fixedSize": "a2",
      "framedPrice": 34000,
      "stock": 1
    },
    {
      "id": "wms8kqd1t",
      "title": "LUXURY.",
      "type": "photo",
      "kind": "print",
      "place": "yokohama",
      "year": "2024",
      "status": "draft",
      "desc": "ある会員制スイーツバーにて。\nブルーのトランクから出てきたのは、真っ赤に輝く宝石たち･･･。\n各々が放つ光に魅了された午後、アフタヌーンティー。\n\nお部屋に飾られる場合、写真はA1サイズ以上の大きさでその存在感を発揮します。\nこの作品は製作者の個展会場にて”特別展示作品”として、くすみ系ゴールドのフレームに入れられて展示されました。\n\n個展内では多くの方に囲まれ記念写真を撮影するなど、とても皆さまに愛された作品です。",
      "images": [
        "../photos/shop/wms8kqd1t-main-ms8kuon8.jpg",
        "../photos/shop/wms8kqd1t-2-ms8kwhqt.jpg",
        "../photos/shop/wms8kqd1t-3-ms8kwq7p.jpg",
        "../photos/shop/wms8kqd1t-4-ms8kwwjg.jpg"
      ],
      "prices": {
        "postcard": 1200,
        "a5": 3300,
        "a4": 12800,
        "a3": 33000,
        "a2": 55000,
        "a1": 88000
      }
    }
  ]
};
