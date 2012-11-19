basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/angular/angular.js',
  'app/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

reporters = ['junit'];

junitReporter = {
  outputFile: 'build/testacular-unit.xml',
  suite: 'unit'
};
