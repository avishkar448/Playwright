// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { trace } from "console";
// import { permission } from 'process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  // workers: 4,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  // retries: 1,
  
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        trace: "retain-on-failure",
        // viewport: {width:720,height:720},
        // ...devices["Galaxy S24"],
        ignoreHttpsErrors: true,
        Permissions: ["geolocation"],
        // video: "on",
      },
    },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     headless: true,
    //     screenshot: "off",
    //     trace: "retain-on-failure",
    //   },
    // },
  ],
};

module.exports = config;
