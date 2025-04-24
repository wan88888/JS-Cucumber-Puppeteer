const { Given, When, Then, Before, After, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const config = require('../../config/config');
const { ensureDirExists, generateScreenshotName } = require('../../utils/helpers');
const LoginPage = require('../../pages/LoginPage');
const SecureAreaPage = require('../../pages/SecureAreaPage');

// 设置默认超时时间
setDefaultTimeout(config.browser.defaultTimeout);

// 确保截图目录存在
ensureDirExists(config.screenshots.path);

let browser;
let page;
let loginPage;
let secureAreaPage;

Before(async function() {
  try {
    browser = await puppeteer.launch({
      headless: config.browser.headless,
      slowMo: config.browser.slowMo,
      defaultViewport: config.browser.defaultViewport,
      args: config.browser.args
    });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
  } catch (error) {
    console.error(`Error in Before hook: ${error.message}`);
    throw error;
  }
});

After(async function(scenario) {
  try {
    // 如果测试失败并且配置为在失败时截图，则截取屏幕截图
    if (scenario.result.status === Status.FAILED && config.screenshots.takeOnFailure) {
      const screenshotName = generateScreenshotName(`failed_${scenario.pickle.name.replace(/\s+/g, '_')}`);
      const screenshotPath = path.join(config.screenshots.path, screenshotName);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Test failed. Screenshot saved to: ${screenshotPath}`);
      
      // 将截图作为附件添加到报告中
      const screenshot = fs.readFileSync(screenshotPath);
      this.attach(screenshot, 'image/png');
    }
  } catch (error) {
    console.error(`Error taking screenshot: ${error.message}`);
  } finally {
    // 确保浏览器总是关闭
    if (browser) {
      await browser.close();
    }
  }
});

Given('I navigate to the login page', async function() {
  try {
    await loginPage.navigateToLoginPage();
  } catch (error) {
    console.error(`Failed to navigate to login page: ${error.message}`);
    throw error;
  }
});

When('I enter username {string}', async function(username) {
  try {
    await loginPage.enterUsername(username);
  } catch (error) {
    console.error(`Failed to enter username: ${error.message}`);
    throw error;
  }
});

When('I enter password {string}', async function(password) {
  try {
    await loginPage.enterPassword(password);
  } catch (error) {
    console.error(`Failed to enter password: ${error.message}`);
    throw error;
  }
});

When('I click on the login button', async function() {
  try {
    await loginPage.clickLoginButton();
  } catch (error) {
    console.error(`Failed to click login button: ${error.message}`);
    throw error;
  }
});

Then('I should be logged in successfully', async function() {
  try {
    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).to.be.true;
    
    const isInSecureArea = await secureAreaPage.isInSecureArea();
    expect(isInSecureArea).to.be.true;
  } catch (error) {
    console.error(`Failed to verify successful login: ${error.message}`);
    throw error;
  }
}); 