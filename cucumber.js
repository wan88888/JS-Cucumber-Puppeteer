module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step_definitions/**/*.js'],
    format: ['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json', 'summary']
  }
}; 