const { test, expect } = require("@playwright/test");

test("Security test request intercept", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("avishkargawali120@gmail.com");
  await page.locator("#userPassword").fill("Avishkar9730");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator("li [routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69139946546655565465eb",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause()
//   await expect(page.locator("p").last())
});

// const { test, expect } = require("@playwright/test");

// test("@QW Security test request intercept", async ({ page }) => {
//   //login and reach orders page
//   await page.goto("https://rahulshettyacademy.com/client");
//   await page.locator("#userEmail").fill("anshika@gmail.com");
//   await page.locator("#userPassword").fill("Iamking@000");
//   await page.locator("[value='Login']").click();
//   await page.waitForLoadState("networkidle");
//   await page.locator(".card-body b").first().waitFor();

//   await page.locator("button[routerlink*='myorders']").click();
//   await page.route(
//     "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
//     (route) =>
//       route.continue({
//         url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
//       })
//   );
//   await page.locator("button:has-text('View')").first().click();
//   await expect(page.locator("p").last()).toHaveText(
//     "You are not authorize to view this order"
//   );
// });
