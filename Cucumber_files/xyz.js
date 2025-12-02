const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const playwright = require("playwright");

// ---------- LOGIN ----------
Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 60 * 1000 },
  async function (username, password) {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await this.page.locator("#userEmail").fill(username);
    await this.page.locator("#userPassword").fill(password);
    await this.page.locator("#login").click();

    // Wait for dashboard
    await this.page.waitForLoadState("networkidle");
  }
);

// ---------- ADD TO CART ----------
When(
  "Add {string} to Cart",
  { timeout: 60 * 1000 },
  async function (productName) {
    const products = this.page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const name = (await products.nth(i).locator("b").textContent()).trim();
      if (name === productName.toUpperCase()) {
        await products.nth(i).locator("text= Add To Cart").click();

        
        await this.page.locator(".toast-container").waitFor({ timeout: 20000 });

        break;
      }
    }

    await this.page.locator("[routerlink*='cart']").click();
  }
);

// ---------- VERIFY IN CART ----------
Then(
  "Verify {string} is displayed in the cart",
  { timeout: 60 * 1000 },
  async function (productName) {
    // Ensure cart fully loads
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("div li").first().waitFor({ timeout: 20000 });

    const isVisible = await this.page
      .locator(`h3:has-text("${productName.toUpperCase()}")`)
      .isVisible();

    expect(isVisible).toBeTruthy();
  }
);

// ---------- CHECKOUT ----------
When(
  "Enter valid details and Place the order",
  { timeout: 60 * 1000 },
  async function () {
    await this.page.locator("text=Checkout").click();

    // CVV
    await this.page.locator(".field.small .input.txt").first().fill("987");

    // Coupon
    await this.page.locator("[name='coupon']").fill("rahulshettyacademy");
    await this.page.locator(".btn.btn-primary.mt-1").click();

    await expect(
      this.page.locator(".mt-1.ng-star-inserted")
    ).toContainText("* Coupon");

    // Country selection
    await this.page.locator("[placeholder='Select Country']").pressSequentially("ind");

    const dropdown = this.page.locator(".ta-results.list-group.ng-star-inserted");
    await dropdown.waitFor();

    const optionCount = await dropdown
      .locator(".ta-item.list-group-item.ng-star-inserted")
      .count();

    for (let i = 0; i < optionCount; i++) {
      const text = await dropdown
        .locator(".ta-item.list-group-item.ng-star-inserted")
        .nth(i)
        .textContent();

      if (text.trim() === "India") {
        await dropdown
          .locator(".ta-item.list-group-item.ng-star-inserted")
          .nth(i)
          .click();
        break;
      }
    }

    await this.page.locator(".action__submit").click();

    // Get order ID
    const orderIdText = await this.page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();

    this.orderId = orderIdText.replaceAll("|", "").trim();
  }
);

Then("Verify order in present in orderHistory", { timeout: 50 * 1000 }, async function () {

    await this.page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await this.page.waitForLoadState("networkidle");

    // Wait for the orders table to load
    await this.page.locator("tbody tr").first().waitFor();

    // Click only the View button inside the first row
    await this.page.locator("tbody tr").first()
        .getByRole("button", { name: "View" })
        .click();

    await this.page.waitForLoadState("networkidle");

    // Verify order ID is visible
    const orderId = await this.page.locator(".col-text").textContent();
    expect(orderId.trim().length).toBeGreaterThan(0);
});

