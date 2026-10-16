import { test, expect } from '@playwright/test';

test('renders the personal page and real project destinations without external dependencies', async ({ page }) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  const failedRequests: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (!request.url().startsWith('http://127.0.0.1:4173/')) externalRequests.push(request.url());
  });
  page.on('response', response => {
    if (response.status() >= 400) failedRequests.push(response.url());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('让好奇心');
  await expect(page.locator('.project-card')).toHaveCount(5);
  const expected = ['brats_segmentation-pytorch', 'UltrasondConfienceMap', 'hpi', 'ABUS-Inception-Unet', 'ship_detection'];
  for (const repo of expected) {
    await expect(page.locator(`.project-card[href="https://github.com/doublechenching/${repo}"]`)).toBeVisible();
  }
  await expect(page.locator('.work-count')).toHaveText('05 个项目');
  await expect(page.locator('.pinned-link')).toHaveAttribute('href', 'https://github.com/TencentAI4S/tfold');
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('filters actual projects and preserves the active filter during translation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '医学影像', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('.work-count')).toHaveText('03 个项目');
  await page.getByRole('button', { name: '生物图像', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card')).toHaveAttribute('href', 'https://github.com/doublechenching/hpi');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.getByRole('button', { name: 'Biological imaging', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.work-count')).toHaveText('01 project');
  await page.getByRole('button', { name: 'Computer vision', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card')).toHaveAttribute('href', 'https://github.com/doublechenching/ship_detection');
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
});

test('persists the selected language and updates metadata and navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Eric Ching — Stay curious. Make it real.');
  await expect(page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByText('About', { exact: true })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /I’m Eric Ching/);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Stay curious.');
  await page.getByRole('button', { name: '切换为中文' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

test('uses system theme initially and remembers an explicit override', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: '切换浅色模式' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.getByRole('button', { name: '切换深色模式' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.theme-toggle')).toHaveAttribute('aria-pressed', 'true');
});

test('mobile navigation opens, follows anchors, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await expect(page.locator('.desktop-nav')).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#mobile-nav').getByRole('link', { name: '关于我' }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#mobile-nav')).toBeHidden();
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('has no horizontal overflow across phone, tablet, and desktop in either language', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ['zh-CN', 'en']) {
      if (await page.locator('html').getAttribute('lang') !== language) await page.locator('.language-toggle').click();
      const overflow = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        return [...document.querySelectorAll<HTMLElement>('main *')]
          .filter(el => getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0)
          .filter(el => el.getBoundingClientRect().right > width + 1 || el.getBoundingClientRect().left < -1)
          .map(el => `${el.tagName}.${el.className}`);
      });
      expect(overflow, `${width}px / ${language}`).toEqual([]);
    }
  }
});

test('remains usable when storage is unavailable and respects reduced motion', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
  });
  await page.goto('/');
  await expect(page.locator('.project-card')).toHaveCount(5);
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const animation = await page.locator('.orb-surface').evaluate(el => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
});

test('supports keyboard entry and secure external links', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: '跳至主要内容' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  const unsafeLinks = await page.locator('a[target="_blank"]').evaluateAll(links =>
    links.filter(link => !link.getAttribute('rel')?.includes('noopener') || !link.getAttribute('rel')?.includes('noreferrer')).length,
  );
  expect(unsafeLinks).toBe(0);
});
