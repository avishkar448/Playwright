const { test, expect } = require("@playwright/test");

test("RahulAcadamy UiComponents", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");

  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");

  await dropdown.selectOption("consult");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());

  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  //Assertion
  //await page.pause();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test.only("Handle child window and tabs", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");

  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  //It is used to handle multiple pages like newpage1, newpage2
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];

  await username.fill(domain);
  await page.pause();
  console.log(await username.inputValue());
  expect(await username.inputValue()).toEqual("mentor@rahulshettyacademy.com");
});
