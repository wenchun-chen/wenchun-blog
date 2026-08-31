import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright is restricted to this project's live Blogger site only.
 * Do not point baseURL / tests at any other origin.
 * See CLAUDE.md "瀏覽器自動化規則" for the full rules.
 */
const BASE_URL = 'https://wenchunlife.blogspot.com/';

export default defineConfig({
  testDir: './automation/playwright',
  outputDir: './artifacts/playwright/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { outputFolder: './artifacts/playwright/report', open: 'never' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
