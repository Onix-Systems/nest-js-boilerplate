module.exports = {
  oauth2: [
    {
      type: 'input',
      name: 'oauth2ClientId',
      message: 'Type your google oauth2 client id token',
      default: '',
    },
    {
      type: 'input',
      name: 'oauth2ClientSecret',
      message: 'Type your google oauth2 client secret token',
      default: '',
    },
    {
      type: 'input',
      name: 'oauth2CallbackUrl',
      message: 'Type your google oauth2 callback url',
      default: 'http://localhost:3000/google/redirect',
    },
    {
      type: 'input',
      name: 'passportSessionSecret',
      message: 'Type your passport session secret key',
      default: 'hello-world',
    },
    {
      type: 'list',
      name: 'sessionsStorage',
      message: 'Choose a storage which you want to use',
      default: 'redis',
      choices: ['redis', 'mongodb', 'mysql'],
    },
  ],
  jwt: [
    {
      type: 'input',
      name: 'jwtSecret',
      message: 'Type your jwt secret',
      default: 'superSecurity',
    },
    {
      type: 'input',
      name: 'refreshTokenExpirationTime',
      message: 'Type your expiration time for refresh token',
      default: '7d',
    },
    {
      type: 'input',
      name: 'accessTokenExpirationTime',
      message: 'Type your expiration time for access token',
      default: '1d',
    },
    {
      type: 'input',
      name: 'accessTokenSecret',
      message: 'Type your secret for access token',
      default: '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
    },
    {
      type: 'input',
      name: 'refreshTokenSecret',
      message: 'Type your secret for refresh token',
      default: 'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
    },
  ],
  passportLocal: [
    {
      type: 'input',
      name: 'passportSessionSecret',
      message: 'Type your passport session secret key',
      default: 'hello-world',
    },
    {
      type: 'list',
      name: 'sessionsStorage',
      message: 'Choose a storage which you want to use',
      default: 'redis',
      choices: ['redis', 'mongodb', 'mysql'],
    },
  ],
};
