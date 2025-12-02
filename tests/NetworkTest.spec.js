const { test, expect, request } = require("@playwright/test");
const APIUtils = require("./utils/APIUtils");
const loginPaylod = {
  userEmail: "avishkargawali120@gmail.com",
  userPassword: "Avishkar9730",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }],
};

const fakePayloadOrders = { data: [], message: "No Order" };

let token;
let orderId;
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtil = new APIUtils(apiContext, loginPaylod);
  response = await apiUtil.createOrder(orderPayload);
  
});

test.beforeEach(async () => {});

test("WebAPI Part 1", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayloadOrders);
      route.fulfill({
        response,
        body
      });
    }
  );

  await page.locator("li [routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log(await page.locator(".mt-4").textContent());



//   await page.waitForSelector("tbody tr");
  
  
});
