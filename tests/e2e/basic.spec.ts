import { test, expect } from '@playwright/test';

test.describe('Basic FE Setup', () => {
  test('should load the FE homepage', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page).toHaveURL('http://localhost:5173/');
    // We can check for some common element, like the app root or a known text
    await expect(page.locator('body')).toBeVisible();
  });
});