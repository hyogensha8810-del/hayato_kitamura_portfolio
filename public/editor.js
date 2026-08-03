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

  /* ---------- GitHubトークン（このブラウザにだけ保存） ---------- */
  var TK = 'honoka-gh-token';
  var tokenInput = document.getElementById('ed-token');

  function getToken() {
    try { return localStorage.getItem(TK) || ''; } catch (e) { return ''; }
  }
  function refreshSetup() {
    var has = !!getToken();
    var d = document.getElementById('ed-setup');
    d.dataset.ok = has ? '1' : '0';
    d.querySelector('summary').textContent =
      has ? '保存の設定（設定ずみ）' : '保存の設定（最初に一度だけ）';
    if (!has) d.open = true;
  }

  document.getElementById('ed-token-save').addEventListener('click', function () {
    var v = (tokenInput.value || '').trim();
    if (!v) { say('トークンを貼り付けてください'); return; }
    try { localStorage.setItem(TK, v); } catch (e) {}
    tokenInput.value = '';
    refreshSetup();
    say('記録しました。これで保存できます');
  });

  document.getElementById('ed-token-clear').addEventListener('click', function () {
    try { localStorage.removeItem(TK); } catch (e) {}
    refreshSetup();
    say('消しました');
  });

  refreshSetup();

  /* ---------- GitHubへ直接保存 ---------- */
  function b64(str) {
    // 日本語を含むのでUTF-8にしてからbase64にする
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function apiPath() {
    return 'src/pages/articles/' + current + '.md';
  }

  async function commit(message) {
    var token = getToken();
    if (!token) {
      document.getElementById('ed-setup').open = true;
      say('先に「保存の設定」を済ませてください');
      return;
    }
    if (!current) { say('先に記事を選んでください'); return; }

    var H = window.__HL;
    var base = 'https://api.github.com/repos/' + H.repo + '/contents/' + apiPath();
    var head = {
      Authorization: 'Bearer ' + token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    var btn = document.getElementById('ed-save');
    var prevLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = '保存中…';

    try {
      // いまのファイルのsha（更新には必須）
      var g = await fetch(base + '?ref=' + H.branch, { headers: head });
      if (g.status === 401) throw new Error('トークンが正しくないようです。発行し直して貼り直してください。');
      if (g.status === 404) throw new Error('ファイルが見つかりません。リポジトリ名を確認してください。');
      if (!g.ok) throw new Error('GitHubから応答がありません（' + g.status + '）');
      var meta = await g.json();

      var r = await fetch(base, {
        method: 'PUT',
        headers: Object.assign({ 'Content-Type': 'application/json' }, head),
        body: JSON.stringify({
          message: message,
          content: b64(src.value),
          sha: meta.sha,
          branch: H.branch
        })
      });

      if (r.status === 403) throw new Error('権限が足りません。トークンのContentsをRead and writeにしてください。');
      if (r.status === 409) throw new Error('GitHub側が新しくなっています。ページを再読み込みしてからやり直してください。');
      if (!r.ok) {
        var e = await r.json().catch(function () { return {}; });
        throw new Error(e.message || ('保存できませんでした（' + r.status + '）'));
      }

      SOURCES[current] = src.value;
      say('保存しました。数分でサイトに反映されます');
    } catch (err) {
      alert('保存できませんでした。\n\n' + (err.message || err));
      say('保存できませんでした');
    } finally {
      btn.disabled = false;
      btn.textContent = prevLabel;
    }
  }

  function setDraft(on) {
    var v = src.value;
    var has = /^draft:\s*true\s*$/m.test(v);
    if (on && !has) {
      // frontmatterの最後（2つ目の---）の直前に入れる
      v = v.replace(/^(---\n[\s\S]*?)(\n---)/, '$1\ndraft: true$2');
    } else if (!on && has) {
      v = v.replace(/^draft:\s*true\s*\n/m, '');
    }
    src.value = v;
    render();
  }

  document.getElementById('ed-save').addEventListener('click', function () {
    if (!current) { say('先に記事を選んでください'); return; }
    if (/^draft:\s*true\s*$/m.test(src.value)) {
      if (!confirm('この記事は下書きのままです。\n下書きを外して公開しますか？\n\n「キャンセル」を押すと、下書きのまま保存します。')) {
        commit('記事を更新（下書き）: ' + current);
        return;
      }
      setDraft(false);
    }
    commit('記事を更新: ' + current);
  });

  document.getElementById('ed-draft').addEventListener('click', function () {
    if (!current) { say('先に記事を選んでください'); return; }
    setDraft(true);
    commit('下書きに戻す: ' + current);
  });

  /* ---------- 保存まわり（手動） ---------- */
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
