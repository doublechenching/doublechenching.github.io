import '@fontsource-variable/dm-sans';
import '@fontsource/dm-mono/latin-400.css';
import './style.css';
import { projects, translations, type Language, type Category, type TranslationKey } from './content';
import { orbitalArt, projectArt } from './art';

const icons: Record<string, string> = {
  asterisk: '<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" stroke-width="2.6"/>',
  'arrow-up-right': '<path d="M5 19 19 5M5 5h14v14"/>',
  'arrow-down': '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  'arrow-up': '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  github: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.81a9.6 9.6 0 0 1 2.5.34c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
  menu: '<path d="M4 7h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
};
const icon = (name: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] ?? ''}</svg>`;
const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)!;

function stored(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function store(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ }
}

let language: Language = stored('ec-language') === 'en' ? 'en' : 'zh';
let filter: 'all' | Category = 'all';
const themeButton = $<HTMLButtonElement>('.theme-toggle');
const languageButton = $<HTMLButtonElement>('.language-toggle');
const menuButton = $<HTMLButtonElement>('.menu-toggle');
const mobileNav = $<HTMLElement>('#mobile-nav');

document.querySelectorAll<HTMLElement>('[data-icon]').forEach(el => {
  el.innerHTML = icon(el.dataset.icon!);
});
document.querySelectorAll<HTMLElement>('.title-asterisk, .about-monogram > span').forEach(el => {
  el.innerHTML = icon('asterisk');
});
$('.orbital-art').innerHTML = orbitalArt();
$('.copyright-year').textContent = String(new Date().getFullYear());

function updateThemeButton(): void {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.innerHTML = icon(dark ? 'sun' : 'moon');
  themeButton.setAttribute('aria-pressed', String(dark));
  const label = language === 'zh' ? (dark ? '切换浅色模式' : '切换深色模式') : (dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  $('meta[name="theme-color"]').setAttribute('content', dark ? '#20231f' : '#f6f5f1');
}

function updateMenuButton(): void {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.innerHTML = icon(open ? 'close' : 'menu');
  menuButton.setAttribute('aria-label', language === 'zh' ? (open ? '关闭导航' : '打开导航') : (open ? 'Close navigation' : 'Open navigation'));
}

function closeMenu(): void {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  updateMenuButton();
}

function renderProjects(): void {
  const visible = projects.filter(project => filter === 'all' || project.category === filter);
  $('.project-grid').innerHTML = visible.map(project => {
    const index = String(projects.indexOf(project) + 1).padStart(2, '0');
    const category = translations[language][project.category === 'medical' ? 'focusMedical' : project.category === 'bio' ? 'focusBio' : 'focusVision'];
    const featured = project.featured && filter === 'all';
    return `<a class="project-card${featured ? ' project-featured' : ''}" data-category="${project.category}" href="https://github.com/doublechenching/${project.repo}" target="_blank" rel="noopener noreferrer" aria-label="${project.repo} — ${language === 'zh' ? '查看 GitHub 仓库（新窗口）' : 'View GitHub repository (opens in a new tab)'}">
      <div class="project-visual visual-${project.art}" aria-hidden="true"><span class="visual-label">${index} / ${project.art === 'brain' ? 'VOLUMETRIC SEGMENTATION' : project.art === 'ultrasound' ? 'CONFIDENCE MAPPING' : project.art === 'cells' ? 'PATTERN RECOGNITION' : project.art === 'volume' ? '3D REPRESENTATION' : 'OBJECT DETECTION'}</span>${projectArt(project.art)}<span class="visual-corner">+</span></div>
      <div class="project-info"><div class="project-meta"><span class="project-category">${category}</span><span>${project.year} / OPEN SOURCE</span></div><h3>${project.title[language]}<span class="project-arrow">${icon('arrow-up-right')}</span></h3><p class="project-repo">${project.repo}</p><p class="project-description">${project.description[language]}</p><div class="project-bottom"><span class="project-language"><i class="language-dot ${project.language === 'C++' ? 'cpp' : project.language === 'Python' ? 'python' : 'notebook'}"></i>${project.language}</span><span class="project-tech">${project.tech.join(' · ')}</span></div></div></a>`;
  }).join('');
  $('.work-count').textContent = language === 'zh' ? `${String(visible.length).padStart(2, '0')} 个项目` : `${String(visible.length).padStart(2, '0')} ${visible.length === 1 ? 'project' : 'projects'}`;
}

function applyLanguage(): void {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    el.innerHTML = translations[language][el.dataset.i18n as TranslationKey];
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-label]').forEach(el => {
    el.setAttribute('aria-label', translations[language][el.dataset.i18nLabel as TranslationKey]);
  });
  languageButton.innerHTML = `${language === 'zh' ? 'EN' : '中'} <span aria-hidden="true">↗</span>`;
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  $('.brand').setAttribute('aria-label', language === 'zh' ? 'Eric Ching — 首页' : 'Eric Ching — Home');
  const title = language === 'zh' ? 'Eric Ching — 让好奇心，有迹可循' : 'Eric Ching — Stay curious. Make it real.';
  document.title = title;
  $('meta[property="og:title"]').setAttribute('content', title);
  $('meta[name="description"]').setAttribute('content', translations[language].heroDescription);
  $('meta[property="og:description"]').setAttribute('content', translations[language].heroDescription);
  updateThemeButton();
  updateMenuButton();
  renderProjects();
}

themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  store('ec-theme', theme);
  updateThemeButton();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (!stored('ec-theme')) {
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    updateThemeButton();
  }
});
languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  store('ec-language', language);
  applyLanguage();
});
document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter as typeof filter;
    document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(candidate => {
      candidate.classList.toggle('active', candidate === button);
      candidate.setAttribute('aria-pressed', String(candidate === button));
    });
    renderProjects();
  });
});
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = open;
  menuButton.setAttribute('aria-expanded', String(!open));
  updateMenuButton();
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  // Updating an icon replaces the clicked SVG, so use the original event path.
  if (!event.composedPath().includes($('.site-header'))) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

applyLanguage();
