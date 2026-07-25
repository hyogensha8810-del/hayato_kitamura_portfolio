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

  if (typeof SITE_PHOTOS !== 'undefined') {
    buildGrid(document.getElementById('masonry'), SITE_PHOTOS.gallery);
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
