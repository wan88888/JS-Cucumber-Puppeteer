# Web Automation Testing Framework

A web automation testing framework using JavaScript, Cucumber, and Puppeteer, following the Page Object Model pattern.

## Features

- Uses Cucumber for BDD-style test scenarios
- Puppeteer for browser automation
- Page Object Model pattern for maintainable test code
- Detailed HTML and JSON reports
- Automatic screenshots on test failures
- Configuration management
- Helper utilities for common tasks
- Improved error handling

## Project Structure

```
|-- config
|   |-- config.js           # 配置文件
|-- features
|   |-- login.feature       # Feature files with scenarios
|   |-- step_definitions
|       |-- login_steps.js  # Step definitions for scenarios
|-- pages
|   |-- BasePage.js         # Base page with common methods
|   |-- LoginPage.js        # Login page object
|   |-- SecureAreaPage.js   # Secure area page object
|-- reports                 # Test reports will be stored here
|-- screenshots             # Test failure screenshots will be stored here
|-- utils
|   |-- helpers.js          # Helper utilities
|-- cucumber.js            # Cucumber configuration
|-- package.json           # Project dependencies
```

## Example Test

The repository includes an example test for the login functionality of http://the-internet.herokuapp.com/login.

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## Running Tests

```bash
# Run all tests (cleans reports first)
npm test

# Run tests in headless mode
npm run test:headless

# Run only login feature
npm run test:login

# Generate detailed reports
npm run test:report

# Clean reports and screenshots
npm run clean
```

## Framework Enhancements

1. **Error Handling**
   - Improved error handling with try-catch blocks
   - Detailed error messaging with context
   - Automatic screenshots on failures

2. **Configuration Management**
   - Centralized configuration in config.js
   - Environment-specific settings
   - Test user credentials management

3. **Page Object Enhancements**
   - More robust element interactions
   - Detailed error logging
   - Screenshot support integrated in base methods

4. **Helper Utilities**
   - Directory management
   - Random string generation
   - Date/time formatting

5. **Test Reporting**
   - HTML and JSON reports
   - Screenshot attachments for failures
   - Clean reports before each test run

## Modifying Tests

1. Add new page objects in the `pages` directory
2. Create feature files in the `features` directory
3. Implement step definitions in the `features/step_definitions` directory 