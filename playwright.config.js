// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Log to confirm that the configuration file is being loaded
 */
console.log('Playwright Config Loaded');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',  // Directory where your test files are located
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],  // Keeps the HTML reporter
    ['allure-playwright'], // Enables the Allure Playwright Reporter
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',  // Uncomment if needed

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', // Collect trace on the first retry of a failed test
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'DEMOPROJECTPLAYWRIGHT',  // Custom project name as per your request
      use: { ...devices['Desktop Chrome'] }, // Adjust the device as needed
    },
    {
      name: 'chromium',  // Chromium configuration
      use: { ...devices['Desktop Chrome'] }, 
    },
    {
      name: 'firefox',  // Firefox configuration
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',  // Webkit configuration
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests (if needed) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
