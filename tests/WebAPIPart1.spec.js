const { test, expect, request } = require("@playwright/test");
const APIUtils= require('./utils/APIUtils')
const loginPaylod = {
  userEmail: "avishkargawali120@gmail.com",
  userPassword: "Avishkar9730",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }],
};

let token;
let orderId;
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtil= new APIUtils(apiContext,loginPaylod)
  response = await apiUtil.createOrder(orderPayload)
  // const loginResponse = await apiContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/auth/login",
  //   {
  //     data: loginPaylod,
  //   }
  // );

  // expect(loginResponse.ok()).toBeTruthy();
  // const loginResponseJson = await loginResponse.json();
  // token = loginResponseJson.token;
  // console.log(token);

  // const orderResponse = await apiContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/order/create-order",
  //   {
  //     data: orderPayload,
  //     headers: {
  //       authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const orderResponseJson = await orderResponse.json();
  // console.log(orderResponseJson);
  // orderId = orderResponseJson.orders[0];
});

test.beforeEach(async () => {});

test("WebAPI Part 1", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  },response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  const productName = "ZARA COAT 3";
  const emailValue = "avishkargawali120@gmail.com";
  const products = page.locator(".card-body");
  //   const email = page.locator("#userEmail");
  //   const password = page.locator("#userPassword");
  //   const login = page.locator("#login");
  const cardTitles = page.locator(".card-body b");

  //login page
  //   await email.fill(emailValue);
  //   await password.fill("Avishkar9730");
  //   await login.click();

  //home page items
  // console.log(await cardTitles.first().waitFor());
  // // await page.waitForLoadState('networkidle');
  // const titles = await cardTitles.allTextContents();
  // console.log(titles);

  // //selecting particular item and adding to cart
  // const count = await products.count();
  // for (let i = 0; i <= count; i++) {
  //   if ((await products.nth(i).locator("b").textContent()) === productName) {
  //     await products.nth(i).locator("text= Add To Cart").click();
  //     break;
  //   }
  // }

  // //verifying correct item is added to cart nd checkout
  // await page.locator("[routerlink*='cart']").click();
  // await page.locator("div li").first().waitFor();
  // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // expect(bool).toBeTruthy();

  // await page.locator("text=Checkout").click();

  // //add cvv
  // await page.locator(".field.small .input.txt").nth(0).fill("987");

  // //apply coupon
  // await page.locator("[name='coupon']").fill("rahulshettyacademy");
  // await page.locator(".btn.btn-primary.mt-1").click();
  // await expect(page.locator(".mt-1.ng-star-inserted")).toContainText(
  //   "* Coupon"
  // );

  // //select country
  // await page.locator("[placeholder='Select Country']").pressSequentially("ind");
  // const dropdown = page.locator(".ta-results.list-group.ng-star-inserted");
  // await dropdown.waitFor();
  // const optionCount = await dropdown
  //   .locator(".ta-item.list-group-item.ng-star-inserted")
  //   .count();
  // for (let i = 0; i < optionCount; i++) {
  //   const text = await dropdown
  //     .locator(".ta-item.list-group-item.ng-star-inserted")
  //     .nth(i)
  //     .textContent();
  //   if (text === " India") {
  //     await dropdown
  //       .locator(".ta-item.list-group-item.ng-star-inserted")
  //       .nth(i)
  //       .click();
  //     break;
  //   }
  // }

  // await expect(page.locator(".user__name [type='text']").first()).toHaveText(
  //   emailValue
  // );
  // await page.locator(".action__submit").click();

  // await page.locator("hero-primary").toHaveText(" Thankyou for the order. ")
  // const orderId = await page
  //   .locator(".em-spacer-1 .ng-star-inserted")
  //   .textContent();
  // const id = orderId.replaceAll("|", "").trim();
  // console.log(id);

  await page.locator("li [routerlink*='myorders']").click();

  await page.waitForSelector("tbody tr");
  const table = await page.locator("tbody tr");

  console.log(await table.count());

  for (let i = 0; i < (await table.count()); i++) {
    const OId = await table.nth(i).locator("th").textContent();
    if (response.orderId.includes(OId)) {
      await table.locator("button").first().click();
      break;
    }
  }
  const orderDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderDetails)).toBeTruthy();

  await page.pause();
});
