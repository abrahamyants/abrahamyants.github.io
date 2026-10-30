/* A small amount of interaction. The work and links also read without JavaScript. */
document.querySelectorAll('[data-tab-group]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const list = group.querySelector('[role="tablist"]');
  if (list.classList.contains('decision-tabs')) {
    const narrow = window.matchMedia('(max-width: 540px)');
    const orient = () => list.setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
    orient();
    narrow.addEventListener('change', orient);
  }
  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let target = index;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) target = (index + 1) % tabs.length;
      else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) target = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      select(target, true);
    });
  });
  select(0);
});

const dialog = document.querySelector('.image-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  const picture = dialog.querySelector('img');
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      picture.src = button.dataset.image;
      picture.alt = button.dataset.alt;
      dialog.querySelector('.original-image').href = button.dataset.image;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => { picture.src = 'data:,'; });
}

// The project name stays visible; the mobile section picker is a real dropdown.
const caseGuide = document.querySelector('.case-nav');
const sectionToggle = document.querySelector('.case-nav-toggle');
const currentSection = document.querySelector('.current-section');
const pageLinks = [...document.querySelectorAll('.case-nav a')];
function fitSectionOffset() {
  if (!caseGuide) return;
  // Offset section targets, not the whole scrollport: the guide itself must stay clickable.
  document.documentElement.style.scrollPaddingTop = '0px';
  document.querySelector('.case-page').style.setProperty('--section-offset', (caseGuide.getBoundingClientRect().height + 18) + 'px');
}
function closeSectionMenu() {
  if (!caseGuide || !sectionToggle) return;
  caseGuide.classList.remove('menu-open');
  sectionToggle.setAttribute('aria-expanded', 'false');
  fitSectionOffset();
}
function markSection(id) {
  pageLinks.forEach(link => {
    if (link.hash === '#' + id) {
      link.setAttribute('aria-current', 'location');
      if (currentSection) currentSection.textContent = link.dataset.sectionName;
    } else link.removeAttribute('aria-current');
  });
}
if (caseGuide && sectionToggle) {
  caseGuide.classList.add('enhanced-nav');
  fitSectionOffset();
  if ('ResizeObserver' in window) new ResizeObserver(fitSectionOffset).observe(caseGuide);
  sectionToggle.addEventListener('click', () => {
    const open = sectionToggle.getAttribute('aria-expanded') !== 'true';
    caseGuide.classList.toggle('menu-open', open);
    sectionToggle.setAttribute('aria-expanded', String(open));
    fitSectionOffset();
  });
  caseGuide.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sectionToggle.getAttribute('aria-expanded') === 'true') {
      closeSectionMenu();
      sectionToggle.focus();
    }
  });
  pageLinks.forEach(link => link.addEventListener('click', () => {
    markSection(link.hash.slice(1));
    closeSectionMenu();
  }));
  document.addEventListener('click', event => {
    if (!caseGuide.contains(event.target)) closeSectionMenu();
  });
}

// Keep ordinary URL hashes and browser Back, and move keyboard focus with the reader.
document.querySelectorAll('.case-page a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const destination = document.querySelector(link.hash);
    if (!destination) return;
    window.setTimeout(() => {
      const heading = destination.querySelector('h2, h3') || destination;
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }, 0);
  });
});

// Keep the current section marked as the reader scrolls.
if ('IntersectionObserver' in window && pageLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      markSection(entry.target.id);
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  pageLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}
