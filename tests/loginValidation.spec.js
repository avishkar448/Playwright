const { test, expect } = require('@playwright/test');

test('Login validation for Rahul Shetty Academy Client App', async ({ page }) => {
  // 1. Open the login URL
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  // 2. Enter credentials
  await page.fill('#userEmail', 'avishkargawali120@gmail.com');
  await page.fill('#userPassword', 'Avishkar9730');

  // 3. Click Login
  await page.click('#login');

  // 4. Wait for navigation or dashboard element
  let loginSuccess = false;
  let errorMsg = '';
  try {
    // Wait for either dashboard or error message
    await Promise.race([
      page.waitForSelector('.card-body', { timeout: 7000 }),
      page.waitForSelector('.toast-message', { timeout: 7000 })
    ]);
    if (await page.isVisible('.card-body')) {
      loginSuccess = true;
    } else if (await page.isVisible('.toast-message')) {
      errorMsg = await page.textContent('.toast-message');
    }
  } catch (e) {
    // Timeout or unexpected error
    if (await page.isVisible('.toast-message')) {
      errorMsg = await page.textContent('.toast-message');
    } else {
      errorMsg = 'Unknown error or timeout';
    }
  }

  // 6. Output the result
  if (loginSuccess) {
    console.log('Login successful');
  } else {
    console.log('Login failed: ' + errorMsg);
  }

  // Assertion for test runner
  expect(loginSuccess, errorMsg || 'Login failed').toBeTruthy();
});
