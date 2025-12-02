const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../Pageobjects/LoginPage");
const dataSet = JSON.parse(
  JSON.stringify(require("./utils/placeorderTestData.json"))
);

const {customtest}=require('./utils/testbase')

// for (const data of dataSet) {
//   test(`Login and purches ${data.productName}`, async ({ page }) => {
//     const loginPage = new LoginPage(page);

//     // const productName = "ZARA COAT 3";
//     // const username = "avishkargawali120@gmail.com";
//     // const password= "Avishkar9730";
//     const products = page.locator(".card-body");

//     await loginPage.goto();
//     await loginPage.validLogin(data.username, data.password);

//     const cardTitles = page.locator(".card-body b");

//     //home page items
//     console.log(await cardTitles.first().waitFor());
//     // await page.waitForLoadState('networkidle');
//     const titles = await cardTitles.allTextContents();
//     console.log(titles);

//     //selecting particular item and adding to cart
//     const count = await products.count();
//     for (let i = 0; i <= count; i++) {
//       if (
//         (await products.nth(i).locator("b").textContent()) ===
//         data.productName
//       ) {
//         await products.nth(i).locator("text= Add To Cart").click();
//         break;
//       }
//     }
//   });
// }


customtest('Login and purches', async ({ page , testDataForOrder}) => {
    const loginPage = new LoginPage(page);

    // const productName = "ZARA COAT 3";
    // const username = "avishkargawali120@gmail.com";
    // const password= "Avishkar9730";
    const products = page.locator(".card-body");

    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const cardTitles = page.locator(".card-body b");

    //home page items
    console.log(await cardTitles.first().waitFor());
    // await page.waitForLoadState('networkidle');
    const titles = await cardTitles.allTextContents();
    console.log(titles);

    //selecting particular item and adding to cart
    const count = await products.count();
    for (let i = 0; i <= count; i++) {
      if (
        (await products.nth(i).locator("b").textContent()) ===
        testDataForOrder.productName
      ) {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  });