const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require("playwright");

//{tags: "@Regression or @ErrorValidation" }

Before(async function () {
  this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

BeforeStep(function(){ 

})

AfterStep(async function({result}){ 
    if(result.status === Status.FAILED){ 
        await this.page.screenshot({path:'Screenshoot1.png'})
    }
})

After(async function () {
  console.log("I am the last to execute");
});
