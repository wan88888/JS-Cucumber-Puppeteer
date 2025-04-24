module.exports = {
  // 基本URL
  baseUrl: 'http://the-internet.herokuapp.com',
  
  // 测试账户信息
  users: {
    standard: {
      username: 'tomsmith',
      password: 'SuperSecretPassword!'
    }
  },
  
  // 浏览器设置
  browser: {
    headless: process.env.HEADLESS === 'true' || 'new',
    slowMo: parseInt(process.env.SLOW_MO || '50'),
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
    defaultTimeout: 30000
  },
  
  // 截图设置
  screenshots: {
    path: './screenshots',
    takeOnFailure: true
  }
}; 