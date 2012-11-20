basePath = '../';

reporters = ['coverage'];

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/angular/angular.js',
  'app/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

preprocessors = {
  '**/app/js/*.js': 'coverage'
};

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

reporters = ['junit'];

junitReporter = {
  outputFile: 'build/testacular-unit.xml',
  suite: 'unit'
};

coverageReporter = {
  type : 'html',
  dir : 'coverage/'
};