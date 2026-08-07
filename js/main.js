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

  function buildGrid(container, list) {
    if (!container || !list) return;
    container.innerHTML = '';
    list.forEach(p => {
      const fig = document.createElement('figure');
      fig.className = 'ph';
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.alt || '';
      img.loading = 'lazy';
      img.addEventListener('load', () => img.classList.add('loaded'));
      fig.appendChild(img);
      fig.addEventListener('click', () => openLightbox(p.src, p.alt));
      container.appendChild(fig);
    });
  }

  /* ---- ALL / GOURMET / SWEETS タブ ----
     ・photos/gallery, photos/galleryWide ＝もともと入っていたスイーツ写真として SWEETS 扱い
     ・photos/gourmet, photos/sweets フォルダへの新規アップロードは自動生成の SITE_PHOTOS_AUTO に入る
  */
  if (typeof SITE_PHOTOS !== 'undefined') {
    const auto = (typeof SITE_PHOTOS_AUTO !== 'undefined') ? SITE_PHOTOS_AUTO : { gourmet: [], sweets: [] };
    const masonryEl = document.getElementById('masonry');
    const wideEl = document.getElementById('masonryWide');
    const tabsEl = document.getElementById('galleryTabs');

    const gallery = SITE_PHOTOS.gallery || [];
    const galleryWide = SITE_PHOTOS.galleryWide || [];
    const autoSweets = auto.sweets || [];
    const autoGourmet = auto.gourmet || [];

    function render(tab) {
      /* GOURMETタブだけ、ファイル名（01_〇〇, 02_〇〇…）の順に
         左→右・上→下の行送りで並べる（入れた順が埋もれないように） */
      masonryEl.classList.toggle('row-order', tab === 'gourmet');
      if (tab === 'gourmet') {
        buildGrid(masonryEl, autoGourmet);
        buildGrid(wideEl, []);
      } else if (tab === 'sweets') {
        buildGrid(masonryEl, gallery.concat(autoSweets));
        buildGrid(wideEl, galleryWide);
      } else {
        buildGrid(masonryEl, gallery.concat(autoSweets, autoGourmet));
        buildGrid(wideEl, galleryWide);
      }
    }

    render('all');

    if (tabsEl) {
      tabsEl.hidden = false;
      tabsEl.innerHTML = '';
      [['all', 'ALL'], ['gourmet', 'GOURMET'], ['sweets', 'SWEETS']].forEach(([key, label]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = label;
        btn.className = 'tab-btn' + (key === 'all' ? ' active' : '');
        btn.addEventListener('click', () => {
          [...tabsEl.children].forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          render(key);
        });
        tabsEl.appendChild(btn);
      });
    }
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
