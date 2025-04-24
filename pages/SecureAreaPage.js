const BasePage = require('./BasePage');
const config = require('../config/config');

class SecureAreaPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = `${config.baseUrl}/secure`;
    this.header = 'h2';
    this.logoutButton = 'a.button.secondary';
    this.successMessage = '.flash.success';
    this.welcomeMessage = '.subheader';
  }

  async isInSecureArea() {
    const header = await this.getText(this.header);
    return header.includes('Secure Area');
  }

  async getWelcomeMessage() {
    if (await this.isElementVisible(this.welcomeMessage)) {
      return await this.getText(this.welcomeMessage);
    }
    return null;
  }

  async logout() {
    await this.click(this.logoutButton);
  }

  async isLogoutSuccessful() {
    // 检查是否重定向到登录页面
    const currentUrl = this.page.url();
    return currentUrl.includes('/login');
  }
}

module.exports = SecureAreaPage; 