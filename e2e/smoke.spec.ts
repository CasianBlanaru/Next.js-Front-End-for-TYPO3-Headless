import { test, expect } from '@playwright/test';

test('homepage should load and show title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.eyebrow').first()).toContainText('PixelCoda Headless');
});

test('search page should load', async ({ page }) => {
  await page.goto('/suche');
  await expect(page.locator('h1').first()).toContainText('Website durchsuchen');
});

test('navigation and responsiveness', async ({ page, isMobile }) => {
  await page.goto('/');

  if (isMobile) {
    await expect(page.locator('main').first()).toBeVisible();
  } else {
    await expect(page.locator('.hero').first()).toBeVisible();
  }
});

test('no console errors on homepage', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  // Filter out any known or ignoreable errors
  const criticalErrors = errors.filter(e => !e.includes('favicon.ico'));
  expect(criticalErrors).toEqual([]);
});

test('accessibility check', async ({ page }) => {
  await page.goto('/');
  // Check if main element exists
  const main = page.locator('main').first();
  await expect(main).toBeVisible();
});
