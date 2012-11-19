basePath = '../';

files = [
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    'test/util/**/*.js',
    'test/e2e/**/*.js'
];

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

proxies = {
    '/':'http://localhost:8000/'
};

reporters = ['junit'];

junitReporter = {
    outputFile:'build/testacular-scenario.xml',
    suite:'e2e'
};
