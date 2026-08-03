/* ほのかログ 編集画面
   静的サイトなので保存はコピペ方式。トークンを持たないので乗っ取りの心配がない。 */
(function () {
  var SOURCES = {};
  try { SOURCES = JSON.parse(document.getElementById('ed-data').textContent || '{}'); } catch (e) {}

  var sel  = document.getElementById('ed-select');
  var src  = document.getElementById('ed-src');
  var prev = document.getElementById('ed-prev');
  var file = document.getElementById('ed-file');
  var msg  = document.getElementById('ed-msg');
  var gh   = document.getElementById('ed-gh');
  var current = '';

  function say(t) { msg.textContent = t; setTimeout(function () { msg.textContent = ''; }, 2600); }

  /* ---------- プレビュー ---------- */
  function render() {
    var text = src.value;
    // frontmatter は本文ではないので、プレビューからは外す
    var body = text.replace(/^---\n[\s\S]*?\n---\n?/, '');
    // 商品リンクは公開時と同じ「準備中」の見た目で出す
    body = body.replace(/\{\{link:([A-Za-z0-9_\-]+)\}\}/g,
      '<span class="lk lk--pending">$1</span>');
    try {
      prev.innerHTML = window.marked.parse(body, { breaks: false, gfm: true });
    } catch (e) {
      prev.textContent = '（プレビューを表示できませんでした）';
    }
  }

  function load(slug) {
    if (!slug || !SOURCES[slug]) return;
    current = slug;
    src.value = SOURCES[slug];
    file.textContent = 'src/pages/articles/' + slug + '.md';
    var H = window.__HL || {};
    gh.href = 'https://github.com/' + H.repo + '/edit/' + H.branch +
              '/src/pages/articles/' + slug + '.md';
    sel.value = slug;
    render();
  }

  /* ---------- 選択範囲を書き換える道具 ---------- */
  function sr() { return { s: src.selectionStart, e: src.selectionEnd, v: src.value }; }

  function apply(text, selStart, selEnd) {
    src.value = text;
    src.focus();
    src.setSelectionRange(selStart, selEnd);
    render();
  }

  function wrap(before, after, placeholder) {
    var o = sr();
    var picked = o.v.slice(o.s, o.e) || placeholder || '';
    var t = o.v.slice(0, o.s) + before + picked + after + o.v.slice(o.e);
    apply(t, o.s + before.length, o.s + before.length + picked.length);
  }

  function eachLine(fn) {
    var o = sr();
    var ls = o.v.lastIndexOf('\n', o.s - 1) + 1;
    var le = o.v.indexOf('\n', o.e);
    if (le === -1) le = o.v.length;
    var block = o.v.slice(ls, le).split('\n').map(fn).join('\n');
    var t = o.v.slice(0, ls) + block + o.v.slice(le);
    apply(t, ls, ls + block.length);
  }

  function insertBlock(text) {
    var o = sr();
    var pre = o.v.slice(0, o.s);
    var pad = pre.length === 0 || /\n\n$/.test(pre) ? '' : (/\n$/.test(pre) ? '\n' : '\n\n');
    var t = pre + pad + text + '\n\n' + o.v.slice(o.e);
    var at = pre.length + pad.length;
    apply(t, at, at + text.length);
  }

  function box(kind, title) {
    insertBlock(
      '<div class="box box--' + kind + '">\n' +
      '<p class="box__title">' + title + '</p>\n\n' +
      'ここに書きます。\n\n' +
      '</div>'
    );
  }

  var CMD = {
    bold:      function () { wrap('**', '**', '強調したい文字'); },
    underline: function () { wrap('<u>', '</u>', '下線をひく文字'); },
    h2:        function () { eachLine(function (l) { return '## ' + l.replace(/^#{1,6}\s*/, ''); }); },
    h3:        function () { eachLine(function (l) { return '### ' + l.replace(/^#{1,6}\s*/, ''); }); },
    quote:     function () { eachLine(function (l) { return '> ' + l.replace(/^>\s*/, ''); }); },
    ul:        function () { eachLine(function (l) { return '- ' + l.replace(/^[-*]\s*/, ''); }); },
    ol:        function () { var n = 0; eachLine(function (l) { n++; return n + '. ' + l.replace(/^\d+\.\s*/, ''); }); },
    hr:        function () { insertBlock('---'); },
    table:     function () {
      insertBlock('| 項目 | 内容 | 備考 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |');
    },
    link: function () {
      var url = prompt('リンク先のURLを入れてください\n（同じサイト内なら /articles/○○ のように）', 'https://');
      if (!url) return;
      var o = sr();
      var label = o.v.slice(o.s, o.e) || prompt('表示する文字は？', 'リンクの文字') || 'リンク';
      var t = o.v.slice(0, o.s) + '[' + label + '](' + url + ')' + o.v.slice(o.e);
      apply(t, o.s + 1, o.s + 1 + label.length);
    },
    product: function () {
      var id = prompt(
        'リンク台帳の商品IDを入れてください。\n\n' +
        '例）shop_nls / shop_fanza_tsuhan\n' +
        '※ 台帳（src/data/links.yml）に登録済みのIDだけが使えます',
        'shop_nls'
      );
      if (!id) return;
      var o = sr();
      var t = o.v.slice(0, o.s) + '{{link:' + id + '}}' + o.v.slice(o.e);
      apply(t, o.s, o.s + id.length + 9);
    },
    'box-point':   function () { box('point', 'ポイント'); },
    'box-caution': function () { box('caution', '注意'); },
    'box-memo':    function () { box('memo', 'メモ'); },
    'box-summary': function () { box('summary', 'まとめ'); }
  };

  document.getElementById('ed-bar').addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-cmd]');
    if (!b) return;
    if (!current) { say('先に記事を選んでください'); return; }
    var fn = CMD[b.dataset.cmd];
    if (fn) fn();
  });

  /* ---------- ショートカット ---------- */
  src.addEventListener('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    var k = e.key.toLowerCase();
    if (k === 'b') { e.preventDefault(); CMD.bold(); }
    if (k === 'u') { e.preventDefault(); CMD.underline(); }
    if (k === 'k') { e.preventDefault(); CMD.link(); }
  });

  src.addEventListener('input', render);
  sel.addEventListener('change', function () { load(sel.value); });

  /* ---------- 保存まわり ---------- */
  document.getElementById('ed-copy').addEventListener('click', function () {
    if (!current) { say('先に記事を選んでください'); return; }
    navigator.clipboard.writeText(src.value).then(
      function () { say('コピーしました。GitHubで貼り付けてください'); },
      function () { src.select(); say('Ctrl+C でコピーしてください'); }
    );
  });

  document.getElementById('ed-dl').addEventListener('click', function () {
    if (!current) { say('先に記事を選んでください'); return; }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([src.value], { type: 'text/markdown' }));
    a.download = current + '.md';
    a.click();
    say('保存しました');
  });

  /* ---------- 起動 ---------- */
  var want = new URLSearchParams(location.search).get('a');
  if (want && SOURCES[want]) load(want);
  else if (Object.keys(SOURCES).length === 1) load(Object.keys(SOURCES)[0]);
})();
