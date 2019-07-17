// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/free-dynatracetrail-page.e2e-spec.ts',
    './src/**/create-account.e2e-spec.ts',
    './src/**/deploy-dynatrace.e2e-spec.ts',
    './src/**/login-and-accountsettings.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
    // maxInstances: 4,
    // shardTestFiles: true
  },
  directConnect: true,
  baseUrl: 'https://www.dynatrace.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare() {
    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};