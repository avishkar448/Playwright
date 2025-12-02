const { test, expect } = require("@playwright/test");

test("Browser Context playwright test", async ({ browser }) => {
  // Chrome - plugin / cookies

  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cartTitle= page.locator(".card-body a");

  //route
  // page.route('**/*.{jpg,png,jpeg}', route => route.abort())

  page.on('request', request => 
    console.log(request.url())
  )

  page.on('response', response =>
    console.log(response.url(), response.status())
  )

  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await page.locator("#username").fill("avishkar");
  await page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  // 
  await username.fill("")
  await username.fill("rahulshettyacademy");
  await signIn.click();
 // console.log(await page.locator(".card-body a").textContent());

  console.log(await cartTitle.first().textContent());
  console.log(await cartTitle.nth(1).textContent());

  // All-Titles 
  const allTitles= await cartTitle.allTextContents();
  console.log(allTitles);
  await page.pause()

});

// test('Page playwright test',async ({page})=>{
//     await page.goto("http://www.google.com")
//     console.log(await page.title());

//     await expect(page).toHaveTitle("Google")

// })
