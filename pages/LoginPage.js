const BasePage = require('./BasePage');
const config = require('../config/config');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = `${config.baseUrl}/login`;
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
    this.successMessage = '.flash.success';
    this.errorMessage = '.flash.error';
    this.secureAreaHeader = 'h2';
  }

  async navigateToLoginPage() {
    await this.navigate(this.url);
  }

  async enterUsername(username) {
    await this.type(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.type(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async isLoginSuccessful() {
    await this.waitForSelector(this.successMessage);
    const message = await this.getText(this.successMessage);
    const header = await this.getText(this.secureAreaHeader);
    return message.includes('You logged into a secure area') && header.includes('Secure Area');
  }

  async isErrorMessageDisplayed() {
    return await this.isElementVisible(this.errorMessage);
  }

  async getErrorMessage() {
    if (await this.isErrorMessageDisplayed()) {
      return await this.getText(this.errorMessage);
    }
    return null;
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginAsStandardUser() {
    const { username, password } = config.users.standard;
    await this.login(username, password);
  }
}

module.exports = LoginPage; 