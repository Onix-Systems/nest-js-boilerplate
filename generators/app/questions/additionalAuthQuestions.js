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
