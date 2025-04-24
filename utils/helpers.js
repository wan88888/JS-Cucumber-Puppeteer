const fs = require('fs');
const path = require('path');

/**
 * 确保目录存在，如果不存在则创建
 * @param {string} dirPath - 目录路径
 */
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * 生成随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} - 随机字符串
 */
function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 格式化日期时间为文件名友好格式
 * @returns {string} - 格式化的日期时间字符串
 */
function formatDateTime() {
  const now = new Date();
  return now.toISOString()
    .replace(/:/g, '-')
    .replace(/\..+/, '')
    .replace('T', '_');
}

/**
 * 生成截图文件名
 * @param {string} prefix - 文件名前缀
 * @returns {string} - 完整的截图文件名
 */
function generateScreenshotName(prefix = 'screenshot') {
  return `${prefix}_${formatDateTime()}.png`;
}

module.exports = {
  ensureDirExists,
  generateRandomString,
  formatDateTime,
  generateScreenshotName
}; 