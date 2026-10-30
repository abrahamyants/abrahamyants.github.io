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

// Keep the project guide useful as the reader moves through a case study.
const pageLinks = [...document.querySelectorAll('.case-nav a')];
if ('IntersectionObserver' in window && pageLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      pageLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  pageLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) observer.observe(section);
  });
}
