let unlock = true;

const body = document.querySelector('body');
const sandwich = document.querySelector('[data-sandwich]');
const logo = document.querySelector('[data-header-logo]');
const nav = document.querySelector('[data-main-nav]');
const menuLinks = document.querySelectorAll('[data-nav-item]');
const DELAY = 150;

function menuClose() {
  body.classList.remove('scroll-lock');
  sandwich.classList.remove('is-active')
  nav.classList.remove('is-active')
  logo.classList.remove('is-menu');

  unlock = true;
}

function menuOpen() {
  body.classList.add('scroll-lock');
  sandwich.classList.add('is-active');
  nav.classList.add('is-active');
  logo.classList.add('is-menu');
  // TODO: Make delay in SCSS
  for (let i = 0; i < menuLinks.length; i++) {
    let listItem = menuLinks[i];

    setTimeout(() => {
      listItem.style.cssText = `
        opacity: 1;
        transform: translateX(0);
      `;
    }, i * DELAY);
  }

  unlock = false;
}

sandwich.addEventListener('click', () => {
  if (unlock) {
    menuOpen();
  } else {
    menuClose();
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menuClose();
  }
});

const resizeObserver = new ResizeObserver(entries => {
  const entry = entries[0];
  const width = entry.contentBoxSize
    ? entry.contentBoxSize.inlineSize
    : entry.contentRect.width;
  if (width >= 1024) menuClose();
})

resizeObserver.observe(document.querySelector('body'));

