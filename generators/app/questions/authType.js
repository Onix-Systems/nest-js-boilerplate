module.exports = [
  {
    type: 'list',
    name: 'authType',
    message: 'Choose auth for your app, please',
    choices: ['jwt', 'oauth2', 'passportLocal'],
  },
];
