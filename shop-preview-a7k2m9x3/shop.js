/* =========================================================
   SHOP の動作（一覧・商品ページ・注文・お気に入り）
   ※ 通常ここを編集する必要はありません。
      商品は shop-data.js、デザインは shop.css で管理します。
   ========================================================= */
(function () {
'use strict';

var D = window.SHOP_DATA;
var IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="22" height="22"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>';
var HEART = '<svg viewBox="0 0 24 24"><path d="M12 20.5S3.8 15 3.8 9.4a4.6 4.6 0 0 1 8.2-2.8 4.6 4.6 0 0 1 8.2 2.8C20.2 15 12 20.5 12 20.5z"/></svg>';
var FAV_KEY = 'hk_shop_favs';

/* ---------- 小さな道具 ---------- */
function yen(n) { return '¥' + Number(n || 0).toLocaleString('ja-JP'); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
  return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function el(id) { return document.getElementById(id); }
function qs(s) { return document.querySelector(s); }
function qsa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
function param(k) { return new URLSearchParams(location.search).get(k); }
function sizeOf(k) { for (var i = 0; i < D.sizes.length; i++) if (D.sizes[i].key === k) return D.sizes[i]; return D.sizes[0]; }
function bandOf(k) { return sizeOf(k).band; }
function product(id) { for (var i = 0; i < D.products.length; i++) if (D.products[i].id === id) return D.products[i]; return null; }
function minPrice(p) {
  if (p.kind === 'framed') return p.framedPrice;
  var v = []; for (var i = 0; i < D.sizes.length; i++) { var x = p.prices && p.prices[D.sizes[i].key]; if (x) v.push(x); }
  return v.length ? Math.min.apply(null, v) : 0;
}
function isDemo() { return !D.formspreeId || D.formspreeId.indexOf('YOUR_') === 0; }

/* ---------- お気に入り（この端末のブラウザに保存） ---------- */
function favs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } }
function isFav(id) { return favs().indexOf(id) >= 0; }
function toggleFav(id) {
  var f = favs(), i = f.indexOf(id);
  if (i < 0) f.push(id); else f.splice(i, 1);
  try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch (e) {}
  paintFavs();
}
function paintFavs() {
  var c = el('favCount'); if (c) c.textContent = favs().length;
  qsa('.shop-heart').forEach(function (b) { b.classList.toggle('on', isFav(b.dataset.id)); });
}

/* ---------- 共通の骨組み ---------- */
function chrome(active) {
  var nav = [
    ['../index.html', 'Works'], ['../about.html', 'About'],
    ['../awards.html', 'Awards'], ['index.html', 'Shop'], ['../contact.html', 'Contact']
  ].map(function (n) {
    return '<a href="' + n[0] + '"' + (n[1] === active ? ' class="active"' : '') + '>' + n[1] + '</a>';
  }).join('');

  document.body.insertAdjacentHTML('afterbegin',
    '<header class="site-header scrolled">' +
      '<a href="../index.html" class="site-logo">HAYATO KITAMURA<span class="logo-sub">グルメの"色気"フォトグラファー</span></a>' +
      '<nav class="site-nav">' + nav +
        '<a href="favorites.html" class="insta-link" aria-label="お気に入り" style="align-items:center">' + HEART.replace('<svg', '<svg width="20" height="20" style="fill:none;stroke:currentColor;stroke-width:1.5"') +
        '<span class="fav-count" id="favCount">0</span></a>' +
        '<a href="https://www.instagram.com/hayato_ichinose_1" target="_blank" rel="noopener" class="insta-link" aria-label="Instagram">' + IG + '</a>' +
      '</nav>' +
      '<button class="nav-toggle" aria-label="menu"><span></span><span></span><span></span></button>' +
    '</header>');

  document.body.insertAdjacentHTML('beforeend',
    '<footer class="site-footer">' +
      '<a href="https://www.instagram.com/hayato_ichinose_1" target="_blank" rel="noopener" class="insta-link" aria-label="Instagram">' + IG + '</a>' +
      '<p style="margin-bottom:14px"><a href="faq.html">送料・納期・お支払い</a>　/　' +
      '<a href="tokushoho.html">特定商取引法に基づく表記</a>　/　<a href="privacy.html">プライバシーポリシー</a></p>' +
      '<p>&copy; 2026 HAYATO KITAMURA. All rights reserved.</p>' +
    '</footer>' +
    '<div class="preview-bar"><b>PREVIEW</b>' +
      '<span>このページはまだ非公開です（検索にも出ません）。' +
      (isDemo() ? '注文しても実際にはメールは送信されません。' : '注文すると hyogensha8810@gmail.com に実際にメールが届きます。') + '</span>' +
      '<a class="sp" href="admin.html">商品管理</a></div>');

  var tg = qs('.nav-toggle'), nv = qs('.site-nav');
  if (tg) tg.addEventListener('click', function () { nv.classList.toggle('open'); });
  paintFavs();
}

/* ---------- カード ---------- */
function card(p) {
  var badge = p.kind === 'framed'
    ? '<span class="shop-badge gold">1点もの・額付き</span>'
    : (p.type === 'oil' ? '<span class="shop-badge">油絵風ポスター</span>' : '');
  var sold = (p.kind === 'framed' && p.stock <= 0) ? '<div class="shop-sold">SOLD OUT</div>' : '';
  var price = p.kind === 'framed' ? yen(p.framedPrice) : yen(minPrice(p)) + '〜';
  return '<div class="shop-card">' +
    '<a class="thumb" href="product.html?id=' + encodeURIComponent(p.id) + '">' +
      '<img src="' + p.images[0] + '" alt="' + esc(p.title) + '" loading="lazy" onload="this.classList.add(\'loaded\')">' +
      badge + sold + '</a>' +
    '<button class="shop-heart" data-id="' + p.id + '" aria-label="お気に入りに追加">' + HEART + '</button>' +
    '<div class="meta"><div class="ttl">' + esc(p.title) + '</div><div class="prc">' + price + '</div></div>' +
  '</div>';
}
function bindHearts(after) {
  qsa('.shop-heart').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); toggleFav(b.dataset.id); if (after) after(); });
  });
}

/* ---------- 一覧ページ ---------- */
var filter = 'all';
function renderList() {
  var pub = D.products.filter(function (p) { return p.status !== 'draft'; });
  var list = pub.filter(function (p) {
    if (filter === 'all') return true;
    if (filter === 'framed') return p.kind === 'framed';
    if (filter === 'oil') return p.type === 'oil' && p.kind !== 'framed';
    return p.type === 'photo' && p.kind !== 'framed';
  });
  el('shopGrid').innerHTML = list.map(card).join('');
  el('shopEmpty').innerHTML = list.length ? '' : '<div class="shop-empty">この分類の作品はまだありません。</div>';
  qsa('.shop-filters button').forEach(function (b) { b.classList.toggle('on', b.dataset.f === filter); });
  bindHearts();
  paintFavs();
}
window.shopInitList = function () {
  chrome('Shop');
  qsa('.shop-filters button').forEach(function (b) {
    b.addEventListener('click', function () { filter = b.dataset.f; renderList(); });
  });
  renderList();
};

/* ---------- お気に入りページ ---------- */
window.shopInitFavorites = function () {
  chrome('Shop');
  function draw() {
    var list = favs().map(product).filter(function (p) { return p && p.status !== 'draft'; });
    el('favGrid').innerHTML = list.map(card).join('');
    el('favEmpty').innerHTML = list.length ? '' :
      '<div class="shop-empty">まだお気に入りがありません。<br>作品のハートマークを押すと、ここに並びます。</div>';
    bindHearts(draw);
    paintFavs();
  }
  draw();
};

/* ---------- 商品ページ ---------- */
var cur = { id: null, size: null, qty: 1 };

function calc() {
  var p = product(cur.id);
  if (!p || p.kind === 'framed') return null;
  var unit = p.prices[cur.size], q = Math.max(1, cur.qty | 0), d = D.repeatDiscount[bandOf(cur.size)];
  return { unit: unit, q: q, d: d, size: sizeOf(cur.size),
           saved: (q - 1) * d, total: unit + (q - 1) * Math.max(0, unit - d) };
}
function paintCalc() {
  var c = calc(), box = el('calcBox'); if (!c || !box) return;
  qsa('#priceRows tr').forEach(function (tr) { tr.classList.toggle('sel', tr.dataset.r === cur.size); });
  var over = c.q >= 10, bulk = el('bulkNote'), btn = el('orderBtn');
  if (bulk) bulk.style.display = over ? 'block' : 'none';
  if (btn) { btn.disabled = over; btn.textContent = over ? '10枚以上はお問い合わせください' : 'この内容で注文する'; }
  box.innerHTML =
    '<div class="r"><span>' + c.size.label + ' 1枚目</span><span>' + yen(c.unit) + '</span></div>' +
    (c.q > 1 ? '<div class="r"><span>2枚目以降　' + (c.q - 1) + '枚</span><span>' + yen(c.unit - c.d) + ' × ' + (c.q - 1) + '</span></div>' +
               '<div class="r disc"><span>まとめ発送によるお値引き</span><span>− ' + yen(c.saved) + '</span></div>' : '') +
    '<div class="r"><span>送料</span><span>無料</span></div>' +
    '<div class="grand"><span class="lb">合計（税込・送料込）</span><span class="vl">' + yen(c.total) + '</span></div>' +
    '<div class="when">お届け目安：ご入金確認後 ' + D.lead[c.size.band] + 'で発送　/　' + c.size.label + '・' + c.size.mm + '</div>';
}

window.shopInitProduct = function () {
  chrome('Shop');
  var p = product(param('id'));
  if (!p) { el('prodBody').innerHTML = '<div class="shop-empty">作品が見つかりませんでした。<br><a href="index.html" class="shop-back">← 一覧にもどる</a></div>'; return; }
  document.title = p.title + ' | SHOP | HAYATO KITAMURA';

  var framed = p.kind === 'framed';
  var soldout = framed && p.stock <= 0;
  var avail = framed ? [] : D.sizes.filter(function (s) { return p.prices && p.prices[s.key]; });
  cur = { id: p.id, size: framed ? p.fixedSize : (avail[0] || D.sizes[0]).key, qty: 1 };

  var rows = framed ? '' :
    avail.map(function (s) {
      return '<tr data-r="' + s.key + '"><td>' + s.label + '</td><td class="dim">' + s.mm +
             '</td><td class="dim">' + s.use + '</td><td>' + yen(p.prices[s.key]) + '</td></tr>'; }).join('') +
    D.sizes.filter(function (s) { return !p.prices || !p.prices[s.key]; }).map(function (s) {
      return '<tr class="na"><td>' + s.label + '</td><td class="dim">' + s.mm + '</td><td class="dim">—</td><td>取扱なし</td></tr>'; }).join('');

  var oilNote = p.type === 'oil'
    ? '<div class="shop-notice"><b>本商品は油彩画ではありません</b>写真作品にデジタルで油絵調の加工を施し、専用紙に印刷したポスターです。実際の絵具の凹凸や筆跡はありません。</div>' : '';
  var frameNote = framed
    ? '<div class="shop-notice"><b>額装済みの1点ものです</b>' + sizeOf(p.fixedSize).label + 'サイズでプリントし、マット＋木製額に収めた状態でお届けします。在庫は1点のみで、追加制作の予定はありません。</div>'
    : '<div class="shop-meta">額縁は付属しません。プリントのみのお届けです。</div>';

  el('prodBody').innerHTML =
  '<a class="shop-back" href="index.html">← 一覧にもどる</a>' +
  '<div class="shop-detail">' +
    '<div class="shop-gal">' +
      '<div class="gal-main"><img id="galMain" src="' + p.images[0] + '" alt="' + esc(p.title) + '"></div>' +
      '<div class="gal-thumbs">' + p.images.map(function (s, i) {
        return '<button class="' + (i ? '' : 'on') + '" data-i="' + i + '" aria-label="画像' + (i + 1) + '"><img src="' + s + '" alt=""></button>'; }).join('') + '</div>' +
      '<div class="gal-note">' + (framed ? '2枚目：額装の状態　3枚目：飾ったときの雰囲気' : '2枚目以降は、実際に部屋へ飾ったときの雰囲気です') + '</div>' +
    '</div>' +
    '<div class="shop-info">' +
      '<h1>' + esc(p.title) + '</h1>' +
      '<div class="sub">' + esc(p.place) + '　' + esc(p.year) + '　/　FREE SHIPPING</div>' +
      '<p class="body">' + esc(p.desc) + '</p>' + oilNote +
      (framed
        ? '<div class="shop-calc" style="margin-top:28px"><div class="grand"><span class="lb">価格（税込・送料込）</span><span class="vl">' + yen(p.framedPrice) + '</span></div>' +
          '<div class="when">在庫：' + (soldout ? 'SOLD OUT' : '残り1点') + '　/　ご入金確認後 3営業日以内に発送</div></div>'
        : '<table class="price-table"><thead><tr><th>SIZE</th><th>実寸</th><th>用途の目安</th><th>価格</th></tr></thead><tbody id="priceRows">' + rows + '</tbody></table>' +
          '<div class="shop-fields">' +
            '<div class="f2"><label class="shop-label" for="sizeSel">サイズ</label><select class="shop-select" id="sizeSel">' +
              avail.map(function (s) { return '<option value="' + s.key + '">' + s.label + ' — ' + s.mm + '</option>'; }).join('') + '</select></div>' +
            '<div class="f1"><label class="shop-label" for="qty">枚数</label><input class="shop-input" type="number" id="qty" value="1" min="1" max="20"></div>' +
          '</div>' +
          '<div class="shop-calc" id="calcBox"></div>' +
          '<div class="shop-bulk" id="bulkNote" style="display:none">10枚以上のご注文は、印刷と発送の調整が必要なため<a href="../contact.html">お問い合わせフォーム</a>よりご相談ください。個別にお見積りいたします。</div>') +
      frameNote +
      '<div class="shop-meta">お支払い：銀行振込 / PayPay / クレジットカード（Square）<br>' +
      'ご注文後、こちらからお支払い方法をご案内するメールをお送りします。この画面でお支払いは発生しません。</div>' +
    '</div>' +
  '</div>' +
  orderFormHTML(soldout);

  qsa('.gal-thumbs button').forEach(function (b) {
    b.addEventListener('click', function () {
      el('galMain').src = p.images[+b.dataset.i];
      qsa('.gal-thumbs button').forEach(function (x) { x.classList.toggle('on', x === b); });
    });
  });
  if (!framed) {
    el('sizeSel').addEventListener('change', function () { cur.size = this.value; paintCalc(); });
    el('qty').addEventListener('input', function () { cur.qty = Math.max(1, Math.min(20, +this.value || 1)); paintCalc(); });
    paintCalc();
  }
  bindOrderForm(p, framed);
};

function orderFormHTML(soldout) {
  return '<div class="order-box" id="orderBox">' +
    '<h2>ORDER</h2>' +
    '<p class="hint">下記をご入力のうえ、いちばん下のボタンを押してください。次の画面で内容をご確認いただけます。</p>' +
    '<div class="order-grid">' +
      '<div><label class="shop-label" for="f_name">お名前<span class="req">必須</span></label><input class="shop-input" type="text" id="f_name" placeholder="山田 太郎"></div>' +
      '<div><label class="shop-label" for="f_mail">メールアドレス<span class="req">必須</span></label><input class="shop-input" type="email" id="f_mail" placeholder="name@example.com"></div>' +
      '<div><label class="shop-label" for="f_zip">郵便番号<span class="req">必須</span></label>' +
        '<div class="zip-row"><input class="shop-input" type="text" id="f_zip" placeholder="2340051" maxlength="8"><button type="button" id="zipBtn">住所を自動入力</button></div>' +
        '<div class="zip-msg" id="zipMsg">7桁を入力すると自動で住所が入ります</div></div>' +
      '<div><label class="shop-label" for="f_tel">電話番号</label><input class="shop-input" type="tel" id="f_tel" placeholder="090-1234-5678"></div>' +
      '<div class="full"><label class="shop-label" for="f_addr">住所<span class="req">必須</span></label><input class="shop-input" type="text" id="f_addr" placeholder="神奈川県横浜市港南区日野中央"></div>' +
      '<div class="full"><label class="shop-label" for="f_addr2">番地・建物名<span class="req">必須</span></label><input class="shop-input" type="text" id="f_addr2" placeholder="1-10-14-2"></div>' +
      '<div class="full"><label class="shop-label" for="f_note">ご要望など</label><textarea class="shop-area" id="f_note" placeholder="ご質問やご要望がありましたらご記入ください"></textarea></div>' +
      '<div class="full"><label class="shop-label">お支払い方法<span class="req">必須</span></label>' +
        '<div class="pay-opts" id="payOpts">' +
          '<label class="on"><input type="radio" name="pay" value="銀行振込" checked><span><span class="pn">銀行振込</span><span class="ps">確認メールに口座をご案内します</span></span></label>' +
          '<label><input type="radio" name="pay" value="PayPay"><span><span class="pn">PayPay</span><span class="ps">受取リンクをお送りします</span></span></label>' +
          '<label><input type="radio" name="pay" value="クレジットカード"><span><span class="pn">クレジットカード</span><span class="ps">Squareの請求書をメールでお送りします</span></span></label>' +
        '</div></div>' +
    '</div>' +
    '<label class="agree-row"><input type="checkbox" id="f_agree"><span>' +
      '<a href="tokushoho.html">特定商取引法に基づく表記</a>と<a href="privacy.html">プライバシーポリシー</a>を確認し、同意します。' +
      '<span class="small">オーダーメイド品のため、お客様のご都合による返品・交換はお受けできません。</span></span></label>' +
    '<button class="shop-submit" id="orderBtn"' + (soldout ? ' disabled' : '') + '>' + (soldout ? 'SOLD OUT' : 'この内容で注文する') + '</button>' +
    '<div class="err-msg" id="errMsg"></div>' +
  '</div>';
}

/* ---------- 郵便番号 → 住所 ---------- */
var ZIP_FALLBACK = { '2340051': ['神奈川県', '横浜市港南区', '日野中央'], '1000001': ['東京都', '千代田区', '千代田'],
  '5300001': ['大阪府', '大阪市北区', '梅田'], '0600001': ['北海道', '札幌市中央区', '北一条西'],
  '9000001': ['沖縄県', '那覇市', '港町'], '6008216': ['京都府', '京都市下京区', '塩小路通'], '4600008': ['愛知県', '名古屋市中区', '栄'] };

function lookupZip() {
  var raw = (el('f_zip').value || '').replace(/[^0-9]/g, ''), msg = el('zipMsg');
  msg.className = 'zip-msg';
  if (raw.length !== 7) { msg.className = 'zip-msg ng'; msg.textContent = '郵便番号は7桁でご入力ください'; return; }
  msg.textContent = '住所を検索しています…';
  function fill(a) {
    el('f_addr').value = a.join('');
    msg.className = 'zip-msg ok'; msg.textContent = '住所を入力しました。番地・建物名をご入力ください';
    var n = el('f_addr2'); if (n) n.focus();
  }
  fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + raw)
    .then(function (r) { return r.json(); })
    .then(function (j) {
      if (j.results && j.results[0]) { var x = j.results[0]; fill([x.address1, x.address2, x.address3]); }
      else { msg.className = 'zip-msg ng'; msg.textContent = 'その郵便番号は見つかりませんでした。住所を直接ご入力ください'; }
    })
    .catch(function () {
      if (ZIP_FALLBACK[raw]) { fill(ZIP_FALLBACK[raw]); }
      else { msg.className = 'zip-msg ng'; msg.textContent = '自動入力できませんでした。お手数ですが住所を直接ご入力ください'; }
    });
}

/* ---------- 注文 ---------- */
function gather(p, framed) {
  var g = function (id) { var e = el(id); return e ? e.value.trim() : ''; };
  var c = framed ? null : calc();
  var pay = qs('input[name=pay]:checked');
  return { p: p, framed: framed, c: c, pay: pay ? pay.value : '',
    name: g('f_name'), mail: g('f_mail'), zip: g('f_zip'), tel: g('f_tel'),
    addr: g('f_addr'), addr2: g('f_addr2'), note: g('f_note'),
    agree: el('f_agree').checked,
    sizeLabel: framed ? sizeOf(p.fixedSize).label : c.size.label,
    qty: framed ? 1 : c.q, total: framed ? p.framedPrice : c.total,
    when: framed ? '3営業日以内' : D.lead[c.size.band] };
}
function validate(o) {
  if (!o.name) return 'お名前をご入力ください';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.mail)) return 'メールアドレスをご確認ください';
  if (!/^[0-9]{3}-?[0-9]{4}$/.test(o.zip.replace(/\s/g, ''))) return '郵便番号を7桁でご入力ください';
  if (!o.addr) return 'ご住所をご入力ください';
  if (!o.addr2) return '番地・建物名をご入力ください';
  if (!o.agree) return '特定商取引法に基づく表記への同意にチェックをお願いします';
  return null;
}
function mailBody(o) {
  return '── ご注文内容 ─────────────\n' +
  '作品名　　：' + o.p.title + (o.p.type === 'oil' ? '（油絵風ポスター／印刷物）' : '') + '\n' +
  '種別　　　：' + (o.framed ? '1点もの・額装済み' : '都度印刷・額なし') + '\n' +
  'サイズ　　：' + o.sizeLabel + '\n' +
  '数量　　　：' + o.qty + (o.framed ? '点' : '枚') + '\n' +
  (o.framed ? '' :
   '1枚目　　　：' + yen(o.c.unit) + '\n' +
   '2枚目以降　：' + (o.c.q > 1 ? yen(o.c.unit - o.c.d) + ' × ' + (o.c.q - 1) + '枚（まとめ発送値引 −' + yen(o.c.saved) + '）' : '—') + '\n') +
  '送料　　　：無料（価格に含む）\n' +
  '合計金額　：' + yen(o.total) + '（税込）\n' +
  'お支払い　：' + o.pay + '\n' +
  '発送目安　：' + o.when + '\n\n' +
  '── お届け先 ───────────────\n' +
  'お名前　　：' + o.name + ' 様\n' +
  'メール　　：' + o.mail + '\n' +
  '電話　　　：' + (o.tel || '（未入力）') + '\n' +
  '郵便番号　：' + o.zip + '\n' +
  'ご住所　　：' + o.addr + o.addr2 + '\n\n' +
  '── ご要望 ────────────────\n' + (o.note || '（なし）') + '\n\n' +
  '──────────────────────\n注文日時：' + new Date().toLocaleString('ja-JP');
}
function subject(o) {
  return '【SHOP注文】' + o.p.title + ' / ' + o.sizeLabel + ' × ' + o.qty + (o.framed ? '点' : '枚') + ' / ' + o.name + '様';
}

function confirmModal(o, send) {
  var d = document.createElement('div');
  d.className = 'shop-modal';
  d.innerHTML = '<div class="shop-sheet">' +
    '<h3>CONFIRM</h3>' +
    '<div class="warn">まだ確定していません。内容をご確認のうえ「注文を確定する」を押してください。</div>' +
    '<dl>' +
      '<div><dt>作品</dt><dd>' + esc(o.p.title) + (o.p.type === 'oil' ? '<span class="s">油絵風ポスター（油彩画ではなく印刷物です）</span>' : '') + '</dd></div>' +
      '<div><dt>サイズ・数量</dt><dd>' + o.sizeLabel + ' × ' + o.qty + (o.framed ? '点' : '枚') +
        '<span class="s">' + (o.framed ? '額装済み' : '額縁は付属しません') + '</span></dd></div>' +
      '<div><dt>送料</dt><dd>無料<span class="s">価格に含まれています</span></dd></div>' +
      '<div><dt>お支払い</dt><dd>' + esc(o.pay) + '</dd></div>' +
      '<div><dt>お届け先</dt><dd>' + esc(o.name) + ' 様<span class="s">〒' + esc(o.zip) + '　' + esc(o.addr) + esc(o.addr2) + '</span><span class="s">' + esc(o.mail) + '</span></dd></div>' +
      '<div><dt>発送目安</dt><dd>ご入金確認後 ' + o.when + '</dd></div>' +
    '</dl>' +
    '<div class="grand"><span class="lb">合計（税込）</span><span class="vl">' + yen(o.total) + '</span></div>' +
    '<div class="sheet-btns"><button class="btn-ghost" id="mCancel">修正する</button>' +
    '<button class="btn-gold" id="mOk">注文を確定する</button></div></div>';
  document.body.appendChild(d);
  d.addEventListener('click', function (e) { if (e.target === d) d.remove(); });
  el('mCancel').onclick = function () { d.remove(); };
  el('mOk').onclick = function () {
    var b = el('mOk'); b.disabled = true; b.textContent = '送信しています…';
    send(o, function (errText) {
      d.remove();
      showDone(o, errText);
    });
  };
}

function sendOrder(o, done) {
  if (isDemo()) { done(null); return; }
  fetch('https://formspree.io/f/' + D.formspreeId, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: subject(o),
      email: o.mail,
      お名前: o.name,
      注文内容: mailBody(o)
    })
  }).then(function (r) { done(r.ok ? null : '送信サーバーからエラーが返りました'); })
    .catch(function () { done('通信に失敗しました'); });
}

function showDone(o, errText) {
  var demo = isDemo();
  var body = document.querySelector('.shop-body');
  body.innerHTML = '<div class="shop-done">' +
    (errText
      ? '<div class="mk" style="color:#d08a72">送信できませんでした</div>' +
        '<p>お手数ですが、時間をおいてもう一度お試しいただくか、<br>' +
        '<a href="mailto:hyogensha8810@gmail.com" style="color:var(--accent)">hyogensha8810@gmail.com</a> まで直接ご連絡ください。</p>' +
        '<p style="font-size:.74rem">（' + esc(errText) + '）</p>'
      : '<div class="mk">THANK YOU</div>' +
        '<p>ご注文ありがとうございます。<br>2営業日以内に、お支払い方法をご案内するメールをお送りします。</p>' +
        '<p style="font-size:.78rem">この時点ではまだお支払いは発生していません。ご入金の確認をもって、ご注文の確定とさせていただきます。</p>') +
    (demo && !errText
      ? '<div style="max-width:640px;margin:44px auto 0;text-align:left;border:1px solid rgba(201,161,92,.3)">' +
        '<div style="font-size:.66rem;letter-spacing:.14em;color:var(--accent);padding:12px 18px;border-bottom:1px solid rgba(201,161,92,.25)">' +
        'プレビュー表示：Formspreeの設定後は、この内容が hyogensha8810@gmail.com に届きます</div>' +
        '<pre style="margin:0;padding:20px;font-size:.7rem;line-height:1.9;white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;color:var(--text-dim)">' +
        esc('件名：' + subject(o) + '\n\n' + mailBody(o)) + '</pre></div>'
      : '') +
    '<div style="margin-top:44px"><a class="shop-back" href="index.html">← 一覧にもどる</a></div></div>';
  window.scrollTo(0, 0);
}

function bindOrderForm(p, framed) {
  el('zipBtn').addEventListener('click', lookupZip);
  el('f_zip').addEventListener('input', function () {
    if (this.value.replace(/[^0-9]/g, '').length === 7) lookupZip();
  });
  qsa('#payOpts label').forEach(function (l) {
    l.addEventListener('click', function () {
      qsa('#payOpts label').forEach(function (x) { x.classList.remove('on'); });
      l.classList.add('on');
    });
  });
  el('orderBtn').addEventListener('click', function () {
    var o = gather(p, framed), err = validate(o), em = el('errMsg');
    if (err) {
      em.textContent = err;
      var ob = el('orderBox'); if (ob && ob.scrollIntoView) ob.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    em.textContent = '';
    confirmModal(o, sendOrder);
  });
}

/* ---------- 資料ページ ---------- */
var DOCS = {
  tokushoho: ['特定商取引法に基づく表記', [
    ['販売業者名', 'HYOGENSHA　北村隼人'],
    ['運営統括責任者', '北村隼人'],
    ['所在地', '〒234-0051\n神奈川県横浜市港南区日野中央1-10-14-2'],
    ['電話番号', '090-5488-2772\n（受付時間：平日10:00〜18:00／撮影業務のため電話に出られない場合があります。お問い合わせはメールを推奨いたします）'],
    ['メールアドレス', 'hyogensha8810@gmail.com'],
    ['販売価格', '各商品ページに表示された金額（消費税込み）'],
    ['商品代金以外の必要料金', 'なし。送料は販売価格に含まれております（全国送料無料）。\nお支払い方法により、金融機関所定の振込手数料はお客様のご負担となります。'],
    ['お支払い方法', '・銀行振込\n・PayPay\n・クレジットカード（Square決済／VISA・Mastercard・JCB・AMEX・Diners）'],
    ['お支払い時期', 'ご注文後にお送りする確認メールに記載の方法で、7日以内にお支払いください。\nご入金の確認をもって、ご注文の確定とさせていただきます。'],
    ['商品の引渡時期', 'ご入金の確認後、下記の期間を目安に発送いたします。\n・ハガキ／A5／A4：3〜5営業日\n・A3／A2：2〜3週間\n・A1：3〜4週間\n・印刷済み・額付き作品：3営業日以内\n\nすべての作品はご注文をいただいてから1点ずつ印刷しております。制作状況により前後する場合は、あらかじめメールにてご連絡いたします。'],
    ['返品・交換について', '本商品は、ご注文をいただいてから1点ずつ制作するオーダーメイド品のため、お客様のご都合による返品・交換・キャンセルはお受けできません。\n\nただし以下の場合は、商品到着後7日以内にご連絡いただければ、送料当方負担にて交換または返金の対応をいたします。\n・輸送中の破損、汚損があった場合\n・ご注文と異なる作品、サイズが届いた場合\n・印刷不良（色ムラ、スジ、傷など）があった場合'],
    ['商品について', '「油絵風ポスター」は油彩画ではありません。写真作品にデジタル加工を施し、専用紙に印刷したポスターです。実際の絵具の凹凸や筆跡はありません。\n\nすべての作品に額縁は付属しません（プリントのみのお届けです）。ただし「1点もの・額付き」と明記された商品のみ、額縁が付属いたします。'],
    ['販売数量', '1回のご注文につき同一作品9枚まで。10枚以上をご希望の場合はお問い合わせフォームよりご相談ください。']
  ]],
  privacy: ['プライバシーポリシー', [
    ['取得する情報', 'ご注文にあたり、お名前・メールアドレス・郵便番号・ご住所・電話番号・ご要望をお預かりします。'],
    ['利用目的', '商品の制作と発送、お支払いのご案内、ご注文に関するご連絡にのみ使用します。それ以外の目的では使用しません。'],
    ['第三者への提供', '商品の配送に必要な範囲で配送業者へお伝えするほか、法令に基づく場合を除き、第三者へ提供することはありません。'],
    ['外部サービスの利用', 'ご注文内容の送信にはフォーム送信サービス（Formspree）を、カード決済にはSquareを利用しています。それぞれのサービスのサーバーを経由します。\n郵便番号からの住所自動入力には zipcloud を利用しています（郵便番号のみを送信します）。'],
    ['お気に入り機能について', 'お気に入りはお客様のブラウザ内にのみ保存され、当方が取得することはありません。'],
    ['保管と削除', 'ご注文情報は取引の記録として保管します。削除をご希望の場合は下記までご連絡ください。'],
    ['お問い合わせ窓口', 'HYOGENSHA　北村隼人\nhyogensha8810@gmail.com']
  ]],
  faq: ['送料・納期・お支払いについて', [
    ['送料', '全国一律で無料です。送料は販売価格に含まれています。北海道・沖縄・離島を含め、追加料金はいただきません。'],
    ['発送方法', 'ハガキ〜A4：厚紙で補強のうえ、レターパックでお届けします（追跡番号あり）。\nA3〜A1：折らずに紙管へ入れ、ゆうパックでお届けします（追跡番号あり）。\n額装済み作品：緩衝材で保護のうえ、ゆうパックでお届けします。'],
    ['納期', 'ハガキ／A5／A4：ご入金確認後 3〜5営業日で発送\nA3／A2：2〜3週間\nA1：3〜4週間\n額装済み作品：3営業日以内\n\nすべてご注文をいただいてから1点ずつ印刷しているため、お時間をいただいております。'],
    ['お支払い方法', '銀行振込／PayPay／クレジットカード（Square）からお選びいただけます。\nご注文後、こちらから該当のご案内メールをお送りします。ご注文の時点ではお支払いは発生しません。'],
    ['複数枚のご注文', '同じ作品を複数枚ご注文の場合、まとめて1つの梱包でお送りするため、2枚目以降は送料相当分をお値引きします。金額は商品ページで自動計算されます。'],
    ['10枚以上のご注文', '印刷と発送の調整が必要なため、個別にお見積りいたします。お問い合わせフォーム、または hyogensha8810@gmail.com までご相談ください。'],
    ['額縁について', '額縁は付属しません（プリントのみのお届けです）。「1点もの・額付き」と表示された作品のみ、額装した状態でお届けします。'],
    ['油絵風ポスターについて', '油彩画ではありません。写真作品にデジタルで油絵調の加工を施し、専用紙に印刷したポスターです。実際の絵具の凹凸や筆跡はありません。'],
    ['作品の取り扱い', '直射日光の当たる場所では退色が早まります。飾る際は直射日光を避け、湿気の少ない場所をおすすめします。']
  ]]
};
window.shopInitDoc = function (key) {
  chrome('Shop');
  var doc = DOCS[key];
  document.title = doc[0] + ' | HAYATO KITAMURA';
  document.querySelector('.shop-body').innerHTML =
    '<div style="max-width:820px">' +
    '<h1 class="page-title">' + (key === 'faq' ? 'GUIDE' : key === 'privacy' ? 'PRIVACY' : 'LEGAL') + '</h1>' +
    '<p class="page-title-jp">' + doc[0] + '</p>' +
    '<dl class="doc-list">' + doc[1].map(function (r) {
      return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl>' +
    '<div style="margin-top:44px"><a class="shop-back" href="index.html">← SHOPにもどる</a></div></div>';
};

/* 管理画面から使う道具を公開 */
window.SHOP_UTIL = { yen: yen, esc: esc, sizeOf: sizeOf, chrome: chrome, minPrice: minPrice };

})();
