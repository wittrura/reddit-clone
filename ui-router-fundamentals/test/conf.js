exports.config = {
  framework: 'jasmine',
  capabilities:{
    'browserName': 'chrome'
  },
  directConnect: true,
  specs: ['*.test.js'],
}
