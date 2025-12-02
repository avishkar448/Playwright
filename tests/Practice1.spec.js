const { test, expect } = require("@playwright/test");

test("rahulacadamy playwright test", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/client");
  console.log(await page.title());

  await page.locator("#userEmail").fill("avishkargawali120@gmail.com");
  await page.locator("#userEmail").screenshot({path:"EmailScreenShot.png"})
  await page.locator("#userPassword").fill("Avishkar9730");
  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  //
  const a = await page.locator(".card-body b").allTextContents();
  console.log(a);
});


test.only('Screen-Shot', async({page})=>{ 
  await page.goto("https://www.google.com/")
  expect(await page.screenshot()).toMatchSnapshot();
})