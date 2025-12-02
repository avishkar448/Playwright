const { test, expect } = require("@playwright/test");

test.describe.configure({mode:'parallel'});

// test("@Webst Client App login", async ({ page }) => {
//   //js file- Login js, DashboardPage
//   const email = "anshika@gmail.com";
//   const productName = "ZARA COAT 3";
//   const products = page.locator(".card-body");
//   await page.goto("https://rahulshettyacademy.com/client");
//   await page.getByPlaceholder("email@example.com").fill(email);
//   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
//   await page.getByRole("button", { name: "Login" }).click();
//   await page.waitForLoadState("networkidle");
//   await page.locator(".card-body b").first().waitFor();

//   await page
//     .locator(".card-body")
//     .filter({ hasText: "ZARA COAT 3" })
//     .getByRole("button", { name: "Add to Cart" })
//     .click();

//   await page
//     .getByRole("listitem")
//     .getByRole("button", { name: "Cart" })
//     .click();

//   //await page.pause();
//   await page.locator("div li").first().waitFor();
//   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

//   await page.getByRole("button", { name: "Checkout" }).click();

//   // await page.getByRole("textbox", { name: /cvv/i }).fill("123");
//   await page.getByLabel("CVV Code ").fill("123")
//   // await page.pause();

//   await page.getByPlaceholder("Select Country").pressSequentially("ind");

//   await page.getByRole("button", { name: "India" }).nth(1).click();
//   await page.getByText("PLACE ORDER").click();

//   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
// });

test("@WebAvi Handle dialog, frame, hover", async ({ page }) => {
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


// test('Screen-Shot', async({page})=>{ 
//   await page.goto("https://www.google.com/")
//   expect(await page.screenshot()).toMatchSnapshot();
// })