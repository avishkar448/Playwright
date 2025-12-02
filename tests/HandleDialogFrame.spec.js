const { test, expect } = require("@playwright/test");

test("Handle dialog, frame, hover", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://www.google.com/")

  // await page.pause()
  // await page.goBack();
  // await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  //Dailog box
  // await page.pause()
  // page.on('dialog',dialog => dialog.accept());
  await page.locator("#confirmbtn").click();
  //   await page.pause();
  await page.locator("#mousehover").hover();

  //Frames
  const framePage = page.frameLocator("#courses-iframe");
  await framePage.locator("a[href*='practice']:visible").first().click();
  // const textCheck = await framePage.locator(".text h2").textContent();
  // console.log(textCheck.split(" ")[1]);
});

