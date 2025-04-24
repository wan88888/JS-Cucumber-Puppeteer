class BasePage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 10000; // 默认超时时间10秒
  }

  async navigate(url, options = {}) {
    const waitUntil = options.waitUntil || 'networkidle2';
    await this.page.goto(url, { waitUntil, timeout: this.defaultTimeout });
  }

  async waitForSelector(selector, options = {}) {
    const timeout = options.timeout || this.defaultTimeout;
    await this.page.waitForSelector(selector, { visible: true, timeout });
  }

  async click(selector, options = {}) {
    try {
      await this.waitForSelector(selector, options);
      await this.page.click(selector);
    } catch (error) {
      console.error(`Failed to click element: ${selector}`);
      await this.takeScreenshot(`click-error-${Date.now()}`);
      throw error;
    }
  }

  async type(selector, text, options = {}) {
    try {
      await this.waitForSelector(selector, options);
      // 清除现有文本
      await this.page.click(selector, { clickCount: 3 });
      await this.page.keyboard.press('Backspace');
      await this.page.type(selector, text);
    } catch (error) {
      console.error(`Failed to type text into element: ${selector}`);
      await this.takeScreenshot(`type-error-${Date.now()}`);
      throw error;
    }
  }

  async getText(selector, options = {}) {
    try {
      await this.waitForSelector(selector, options);
      return await this.page.$eval(selector, el => el.textContent.trim());
    } catch (error) {
      console.error(`Failed to get text from element: ${selector}`);
      await this.takeScreenshot(`getText-error-${Date.now()}`);
      throw error;
    }
  }

  async isElementVisible(selector, options = {}) {
    const timeout = options.timeout || 5000;
    try {
      await this.page.waitForSelector(selector, { visible: true, timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  async takeScreenshot(name) {
    const path = `./screenshots/${name}.png`;
    try {
      await this.page.screenshot({ path, fullPage: true });
      console.log(`Screenshot saved to: ${path}`);
    } catch (error) {
      console.error(`Failed to take screenshot: ${error.message}`);
    }
  }

  async waitForTimeout(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async getCount(selector) {
    try {
      await this.waitForSelector(selector, { timeout: 1000 });
      return await this.page.$$eval(selector, elements => elements.length);
    } catch (error) {
      return 0;
    }
  }
}

module.exports = BasePage; 