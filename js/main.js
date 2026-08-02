/* サイトの動き（スライドショー・グリッド・メニュー）
   ※ 通常ここを編集する必要はありません。写真は photos.js で管理します。 */

document.addEventListener('DOMContentLoaded', () => {

  /* ヘッダー：スクロールで背景を濃く */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* スマホメニュー */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  /* ---- トップページのみ ---- */
  const heroSlides = document.getElementById('heroSlides');
  if (heroSlides && typeof SITE_PHOTOS !== 'undefined') {
    SITE_PHOTOS.hero.forEach((p, i) => {
      const d = document.createElement('div');
      d.className = 'hero-slide' + (i === 0 ? ' show' : '');
      d.style.backgroundImage = `url('${p.src}')`;
      heroSlides.appendChild(d);
    });
    const slides = heroSlides.children;
    let cur = 0;
    if (slides.length > 1) {
      setInterval(() => {
        slides[cur].classList.remove('show');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('show');
      }, 5200);
    }
  }

  /* ---- 写真グリッド ---- */
  function buildGrid(container, list) {
    if (!container) return;
    container.innerHTML = '';
    if (!list || !list.length) return;
    list.forEach(p => {
      const fig = document.createElement('figure');
      fig.className = 'ph';
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.alt || '';
      img.loading = 'lazy';
      img.addEventListener('load', () => {
        // 写真そのものの縦横比をタイルに反映（縦・横・正方形がバラバラに並ぶ）
        if (img.naturalWidth && img.naturalHeight) {
          fig.style.setProperty('--ar', img.naturalWidth + ' / ' + img.naturalHeight);
        }
        img.classList.add('loaded');
      });
      fig.appendChild(img);
      fig.addEventListener('click', () => openLightbox(p.src, p.alt));
      container.appendChild(fig);
    });
  }

  /* ---- Works のタブ切り替え（ALL / GOURMET / SWEETS）---- */
  if (typeof SITE_PHOTOS !== 'undefined') {
    const auto = (typeof SITE_PHOTOS_AUTO !== 'undefined') ? SITE_PHOTOS_AUTO : {};
    const gourmet = SITE_PHOTOS.gourmet || auto.gourmet || [];
    const sweets  = SITE_PHOTOS.sweets  || auto.sweets  || [];
    const gallery = SITE_PHOTOS.gallery || [];

    const SETS = {
      all:     [].concat(gourmet, sweets, gallery),
      gourmet: gourmet,
      sweets:  sweets
    };

    const masonry = document.getElementById('masonry');
    const tabsBox = document.getElementById('galleryTabs');

    if (masonry) {
      // グルメ・スイーツのどちらにも写真が無いうちはタブを出さない
      const useTabs = gourmet.length > 0 || sweets.length > 0;

      const show = key => {
        buildGrid(masonry, SETS[key] && SETS[key].length ? SETS[key] : SETS.all);
        if (tabsBox) {
          tabsBox.querySelectorAll('.gallery-tab').forEach(b => {
            b.classList.toggle('active', b.dataset.cat === key);
          });
        }
      };

      if (useTabs && tabsBox) {
        const defs = [
          { cat: 'all',     en: 'ALL',     jp: 'すべて',   on: true },
          { cat: 'gourmet', en: 'GOURMET', jp: 'グルメ',   on: gourmet.length > 0 },
          { cat: 'sweets',  en: 'SWEETS',  jp: 'スイーツ', on: sweets.length > 0 }
        ];
        defs.filter(d => d.on).forEach(d => {
          const b = document.createElement('button');
          b.className = 'gallery-tab';
          b.type = 'button';
          b.dataset.cat = d.cat;
          b.innerHTML = d.en + '<span class="tab-jp">' + d.jp + '</span>';
          b.addEventListener('click', () => {
            history.replaceState(null, '', d.cat === 'all' ? location.pathname : '#' + d.cat);
            show(d.cat);
          });
          tabsBox.appendChild(b);
        });
        tabsBox.hidden = false;
      }

      const fromHash = location.hash.replace('#', '');
      show(SETS[fromHash] && SETS[fromHash].length ? fromHash : 'all');
    }

    buildGrid(document.getElementById('masonryWide'), SITE_PHOTOS.galleryWide);
  }

  /* ライトボックス */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  function openLightbox(src, alt) {
    if (!lb) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  if (lb) {
    lb.addEventListener('click', () => {
      lb.hidden = true;
      document.body.style.overflow = '';
    });
  }
});
