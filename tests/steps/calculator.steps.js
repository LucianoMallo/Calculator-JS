const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url= "http://127.0.0.1:5500/Calculator-JS/"

Given("a user opens the app", async ()=> {
  await page.goto(url)
});

Then(
  "the display screen should show the following value: {string}",
  async (string)=> {
   
    const display = await page.locator('[data-testid="display"]').inputValue();
    //const display = await page.locator('input#Result_Screen');
    expect(display).toBe(string);
    //return "pending";
  }
);
