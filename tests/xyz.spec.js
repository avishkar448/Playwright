const {test}= require("@playwright/test");

test("Practical", async({page})=>{ 
    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title());

    //locator 



    
     
})