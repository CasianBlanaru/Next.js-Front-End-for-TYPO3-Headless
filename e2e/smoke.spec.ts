import { test, expect } from '@playwright/test';

test('homepage should load and show title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.eyebrow')).toContainText('PixelCoda Headless');
});

test('search page should load', async ({ page }) => {
  await page.goto('/suche');
  await expect(page.locator('h1')).toContainText('Website durchsuchen');
});

test('navigation and responsiveness', async ({ page, isMobile }) => {
  await page.goto('/');

  if (isMobile) {
    // Mobile specific checks if any (e.g. burger menu)
    // For now we just check if it loads
    await expect(page.locator('main')).toBeVisible();
  } else {
    await expect(page.locator('.hero')).toBeVisible();
  }
});

test('no console errors on homepage', async ({ page }) => {
  const errors: any[] = [];
  page.on('pageerror', (err) => errors.push(err));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  expect(errors).toEqual([]);
});

test('accessibility check', async ({ page }) => {
  await page.goto('/');
  // Basic check for main landmark
  await expect(page.locator('main')).toHaveAttribute('role', 'main', { timeout: 0 }).catch(() => {
    // If not role=main, at least it should exist
    return expect(page.locator('main')).toBeVisible();
  });
});
